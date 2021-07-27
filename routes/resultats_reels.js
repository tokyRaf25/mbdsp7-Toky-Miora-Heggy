let ResultatReel = require('../models/resultats_reel');
let ResultatPredit = require('./resultats_predits');
let Client = require('./clients');

//Récupérer tous les ResultatReels (GET), avec paggination
function getResultatReels(req, res){
    var aggregateQuery = ResultatReel.aggregate(); 
    
    ResultatReel.aggregatePaginate(
    aggregateQuery,
    {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    },
    (err, resultatReel) => {
      if (err) {
        res.send(err);
      }
      res.send(resultatReel);
    }
  );
}

//Récupérer un ResultatReel par son id (GET)
function getResultatReel(req, res) {
    console.log("get resultat réel by id "+req.params.id)
    let resultatReelId = req.params.id;
  
    ResultatReel.findOne({ _id: resultatReelId }, (err, resultatReel) => {
      if (err) {
        res.send(err);
      }
      res.json(resultatReel);
    });
}

// Ajout d'un assignment (POST)
/*function postResultatReel(req, res) {
    let resultatReel = new ResultatReel();
    resultatReel.idPariSport = req.body.idPariSport;
    resultatReel.idChamp = req.body.idChamp;
    console.log("POST résultat réel reçu :");
    console.log(resultatReel);
  
    resultatReel.save((err) => {
      if (err) {
        res.send("cant post resultatReel ", err);
      }
      res.json({ message: `${resultatReel._id} saved!` });
    });
  }*/
let postResultatReel = async(req, res)=> {
    let resultatReel = new ResultatReel();
    resultatReel.idPariSport = req.body.idPariSport;
    resultatReel.idChamp = req.body.idChamp;
    console.log("POST résultat réel reçu :");
  
    var resultatPredit_vrai = await ResultatPredit.getResultatPreditsWithoutPagginate(resultatReel.idPariSport,resultatReel.idChamp);
    await ResultatPredit.updateToOne(resultatReel.idPariSport, resultatReel.idChamp, res);

    
    resultatPredit_vrai.forEach(async(element)=>{
      console.log(element);
      await Client.updateJetonsClient(element.idClient, element.gain);
    });


    await resultatReel.save((err) => {
      if (err) {
        res.send("cant post resultatReel ", err);
      }
      res.json({ message: `${resultatReel._id} enregistrer!` });
    });
  }

// Update d'un ResultatReel (PUT)
function updateResultatReel(req, res) {
    console.log("UPDATE recu ResultatReel : ");
    console.log(req.body);
    ResultatReel.findByIdAndUpdate(
      req.body._id,
      req.body,
      { new: true },
      (err, resultatReel) => {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          res.json({ message: "Mise à jour" });
        }
      }
    );
  }
  
  // suppression d'un ResultatReel (DELETE)
  function deleteResultatReel(req, res) {
    ResultatReel.findByIdAndRemove(req.params.id, (err, resultatReel) => {
      if (err) {
        res.send(err);
      }
      res.json({ message: `${resultatReel.autres_info} supprimer` });
    });
  }

  function getPariByType(req,res){
    let typePari = req.params.type;
    ResultatReel.find({ idTypePari: typePari }, (err, champ) => {
      if (err) {
        res.send(err);
      }
      res.json(champ);
    });
  }
  function deleteResultBypari(req,res){
	ResultatReel.remove({idPariSport:req.params.id},
      (err, rs) => {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          res.json({ message: "Supprimer" });
        }
      });
 }
  function getPariByParisAndChamp(req,res){
    let idPariSport = req.params.idPariSport;
	let idChamp = req.params.idChamp;
    ResultatReel.find({ idPariSport: idPariSport,idChamp:idChamp }, (err, rs) => {
      if (err) {
        res.send(err);
      }
      res.json(rs);
    });
  }
  module.exports = {
    getResultatReels,
    postResultatReel,
    getResultatReel,
    updateResultatReel,
    deleteResultatReel,
    getPariByType,
	deleteResultBypari,
	getPariByParisAndChamp
  };
