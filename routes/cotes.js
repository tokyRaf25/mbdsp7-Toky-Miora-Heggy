let Cote = require('../models/cote');
const jwt = require('jsonwebtoken');

//Récupérer tous les cotes (GET), avec paggination
function getCotes(req, res){
    var aggregateQuery = Cote.aggregate(); 
    
    Cote.aggregatePaginate(
    aggregateQuery,
    {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    },
    (err, cotes) => {
      if (err) {
        res.send(err);
      }
      res.send(cotes);
    }
  );
}

//Récupérer un cote par son id (GET)
function getCote(req, res) {
    let coteId = req.params.id;
  
    Cote.findOne({ id: coteId }, (err, cote) => {
      if (err) {
        res.send(err);
      }
      res.json(cote);
    });
}

// Ajout d'un assignment (POST)
function postCote(req, res) {
	try { 
		const token = req.body.token; 
		console.log("token",token);
		if(!token || typeof token ==='undefined') res.status(403).send("token error");
	   
		const user =  jwt.verify(token,'supersecret');
		let cote = new Cote();
		cote.id = req.body.id;
		cote.idParieSport = req.body.idParieSport;
		cote.idChamp = req.body.idChamp;
		cote.cotes = req.body.cotes;
	  
		console.log("POST cote reçu :");
		console.log(cote);
	  
		cote.save((err) => {
		  if (err) {
			res.send("cant post cote ", err);
		  }
		  res.json({ message: `${cote.idChamp} enregistrer!` });
		});
	}
	catch(e) { 
		if(e.name==='TokenExpiredError') { 
			res.status(403).send({error:"Veuillez se reconnecter , votre session a expiré"});
		}
		res.send(e);
    }
  }


// Update d'un cote (PUT)
function updateCote(req, res) {
    console.log("UPDATE recu cote : ");
    console.log(req.body);
    Cote.findByIdAndUpdate(
      req.body._id,
      req.body,
      { new: true },
      (err, cote) => {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          res.json({ message: "Mise à jour" });
        }
      }
    );
  }
  
// suppression d'un cote (DELETE)
function deleteCote(req, res) {
    Cote.findByIdAndRemove(req.params.id, (err, cote) => {
      if (err) {
        res.send(err);
      }
      res.json({ message: `${cote.coteId} supprimer` });
    });
}

function deleteCoteBypari(req,res){
	Cote.remove({idParieSport:req.params.id},
      (err, cote) => {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          res.json({ message: "Supprimer" });
        }
      });
}
  module.exports = {
    getCotes,
    postCote,
    getCote,
    updateCote,
    deleteCote,
	deleteCoteBypari
  };
