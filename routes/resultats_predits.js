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
    resultatPredit.idResultatsReel = req.body.idResultatsReel;
    resultatPredit.idClient = req.body.idClient;
    resultatPredit.mise = req.body.mise;
    resultatPredit.montant = req.body.montant;
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

  module.exports = {
    getResultatPredits,
    postResultatPredit,
    getResultatPredit,
    updateResultatPredit,
    deleteResultatPredit,
    getPariByType,
  };