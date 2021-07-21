let ResultatPredit = require('../models/resultats_predit');


//Récupérer tous les ResultatPredits (GET), avec paggination
function getResultatPredits(req, res){
    var aggregateQuery = ResultatPredit.aggregate(); 
    
    ResultatPredit.aggregatePaginate(
    aggregateQuery,
    {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    },
    (err, resultatPredit) => {
      if (err) {
        res.send(err);
      }
      res.send(resultatPredit);
    }
  );
}

//Récupérer un ResultatPredit par son id (GET)
function getResultatPredit(req, res) {
    console.log("get résultat prédit by id "+req.params.id)
    let resultatPreditId = req.params.id;
  
    ResultatPredit.findOne({ _id: resultatPreditId }, (err, resultatPredit) => {
      if (err) {
        res.send(err);
      }
      res.json(resultatPredit);
    });
}

// Ajout d'un assignment (POST)
function postResultatPredit(req, res) {
    let resultatPredit = new ResultatPredit();
    resultatPredit.idClient = req.body.idResultatsReel;
    resultatPredit.idChamp = req.body.idChamp;
    resultatPredit.idPariSport = req.body.idPariSport;
    resultatPredit.cotes = req.body.cotes;
    resultatPredit.mise = req.body.mise;
    resultatPredit.gain = req.body.gain;
    resultatPredit.status = req.body.status;
    console.log("POST résultat prédit reçu :");
    console.log(resultatPredit);
  
    resultatPredit.save((err) => {
      if (err) {
        res.send("cant post resultatPredit ", err);
      }
      res.json({ message: `${resultatPredit._id} saved!` });
    });
  }


// Update d'un ResultatPredit (PUT)
function updateResultatPredit(req, res) {
    console.log("UPDATE recu ResultatPredit : ");
    console.log(req.body);
    ResultatPredit.findByIdAndUpdate(
      req.body._id,
      req.body,
      { new: true },
      (err, resultatPredit) => {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          res.json({ message: "updated" });
        }
      }
    );
  }
  
  // suppression d'un ResultatPredit (DELETE)
  function deleteResultatPredit(req, res) {
    ResultatPredit.findByIdAndRemove(req.params.id, (err, resultatPredit) => {
      if (err) {
        res.send(err);
      }
      res.json({ message: `${resultatPredit.autres_info} deleted` });
    });
  }

  function getPariByType(req,res){
    let typePari = req.params.type;
    ResultatPredit.find({ idTypePari: typePari }, (err, champ) => {
      if (err) {
        res.send(err);
      }
      res.json(champ);
    });
  }
  
  function updateOne(req,res){
	  ResultatPredit.updateMany(
			{ "idPariSport" : req.params.id}, 
			{ "$set" : { "status" : "1" } }, 
			{ "upsert" : true },(err,rep)=>{
				if (err) {
					res.send(err);
				  }
				res.json(rep);			
	  });
  }

  module.exports = {
    getResultatPredits,
    postResultatPredit,
    getResultatPredit,
    updateResultatPredit,
    deleteResultatPredit,
    getPariByType,
	updateOne
  };