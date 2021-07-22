const Categorie = require('../models/Categorie');
let Champ = require('../models/champ_par_categorie_pari');
const categorie =  require("./categorie.route")
const jwt = require('jsonwebtoken');

//Récupérer tous les cotes (GET), avec paggination
function getChamps(req, res){
    var aggregateQuery = Champ.aggregate(); 
    
    Champ.aggregatePaginate(
    aggregateQuery,
    {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    },
    (err, champ) => {
      if (err) {
        res.send(err);
      }
      res.send(champ);
    }
  );
}

//Récupérer un cote par son id (GET)
function getChamp(req, res) {
    let champId = req.params.id;
  
    Champ.findOne({ id: champId }, (err, champ) => {
      if (err) {
        res.send(err);
      }
      res.json(champ);
    });
}

// Ajout d'un champ (POST)
function postChamp(req, res) {
	try { 
	   const token = req.body.token; 
	   console.log("token",token);
	   if(!token || typeof token ==='undefined') res.status(403).send("token error");
	   
	   const user =  jwt.verify(token,'supersecret');
	   console.log("execution d'une requete POST!");
		let champ = new Champ();
		champ.idCategorie = req.body.idCategorie;
		champ.nomChamp = req.body.nomChamp;
	  
		console.log("POST champ reçu :");
		console.log(champ);
	  
		champ.save((err) => {
		  if (err) {
			res.send("cant post champ ", err);
		  }
		  res.json({ message: `${champ.nomChamp} saved!` });
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
function updateChamp(req, res) {
	try { 
		const token = req.body.token; 
		console.log("token",token);
		if(!token || typeof token ==='undefined') res.status(403).send("token error");
		const user =  jwt.verify(token,'supersecret');
			console.log("UPDATE recu Champ : ");
			console.log(req.body);
			Champ.findByIdAndUpdate(
			  req.body._id,
			  req.body,
			  { new: true },
			  (err, champ) => {
				if (err) {
				  console.log(err);
				  res.send(err);
				} else {
				  res.json({ message: "updated" });
				}
			  }
			);
	}
	catch(e) { 
		if(e.name==='TokenExpiredError') { 
			res.status(403).send({error:"Veuillez se reconnecter , votre session a expiré"});
		}
		res.send(e);
    }
  }
  
  // suppression d'un cote (DELETE)
  function deleteChamp(req, res) {
	  try { 
	    const token = req.query.token; 
	    console.log("token",token);
	    if(!token || typeof token ==='undefined') res.status(403).send("token error");
	   
	    const user =  jwt.verify(token,'supersecret');
		console.log("suppression champ "+req.params.id);
		Champ.findByIdAndRemove(req.params.id, (err, champ) => {
		  if (err) {
			res.send(err);
		  }
		  res.json({ message: `${champ.nomChamp} deleted` });
		});
	  }
	  catch(e) { 
		if(e.name==='TokenExpiredError') { 
			res.status(403).send({error:"Veuillez se reconnecter , votre session a expiré"});
		}
		res.send(e);
      }
  }


  //Avoir les champs à partir d'une categorie
  function getChampByIdCategorie(req, res){
    let categorieId = req.params.id;
    Champ.find({ idCategorie: categorieId }, (err, champ) => {
      if (err) {
        res.send(err);
      }
      res.json(champ);
    });
  }

  //Avoir les champs par categories
  function getChampParCategorie(req,res){
    var champQuery = Champ.aggregate();
    var dataReturn;
    Champ.aggregatePaginate(
      champQuery,
      {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
      }).then(function(results){
        var tab = Array.from(results.docs);
        var data = [];
        tab.forEach(element => {
          data.push(element);
          //console.log(element);
        });
           var hash = data.reduce((p,c) => (p[c.idCategorie] ? p[c.idCategorie].push(c) : p[c.idCategorie] = [c],p) ,{});
           var newData = Object.keys(hash).map(
             function(k){
             return {idCategorie: k, /*nomCategorie:categorie.getNomByIdCategorie(k),*/ champs: hash[k]}
            });

           //console.log(categorie.getNomByIdCategorie("60c8945b80e58a3b546df516"));

        dataReturn = {
          docs:newData,
          totalDocs:results.totalDocs,
          limit:results.limit,
          page:results.page,
          totalPages:results.totalPages,
          pagingCounter:results.pagingCounter,
          hasPrevPage:results.hasPrevPage,
          hasNextPage:results.hasNextPage,
          prevPage:results.prevPage,
          nextPage:results.nextPage
        }
        res.send(dataReturn);
      }).catch(function(err){
        res.send(err);
      });
  }

  deleteChampAvecCategorie = async(req,res)=>{
	Champ.deleteOne({idCategorie:req.params.id}, (err, champ) => {
    if (err) {
	 res.send(err);
    }
    res.json({ message: 'deleted' });
	});
  }


  module.exports = {
    getChamps,
    postChamp,
    getChamp,
    updateChamp,
    deleteChamp,
    getChampByIdCategorie,
    getChampParCategorie,
	deleteChampAvecCategorie
  };
