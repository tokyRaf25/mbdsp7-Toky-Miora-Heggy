let PointDeVente = require('../models/point_de_vente');


//Récupérer tous les PointDeVentes (GET), avec paggination
function getPointDeVentes(req, res){
    var aggregateQuery = PointDeVente.aggregate(); 
    
    PointDeVente.aggregatePaginate(
    aggregateQuery,
    {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    },
    (err, pointdevente) => {
      if (err) {
        res.send(err);
      }
      res.send(pointdevente);
    }
  );
}

//Récupérer un PointDeVente par son id (GET)
function getPointDeVente(req, res) {
    console.log("get point de vente by id "+req.params.id)
    let pointDeVenteId = req.params.id;
  
    PointDeVente.findOne({ _id: pointDeVenteId }, (err, pointDeVente) => {
      if (err) {
        res.send(err);
      }
      res.json(pointDeVente);
    });
}

// Ajout d'un assignment (POST)
function postPointDeVente(req, res) {
    let pointDeVente = new PointDeVente();
    pointDeVente.nomDuLieu = req.body.nomDuLieu;
    pointDeVente.latitude = req.body.latitude;
    pointDeVente.longitude = req.body.longitude;
    console.log("POST pointDeVente reçu :");
    console.log(pointDeVente);
  
    pointDeVente.save((err) => {
      if (err) {
        res.send("cant post pointDeVente ", err);
      }
      res.json({ message: `${pointDeVente._id} enregistrer!` });
    });
  }


// Update d'un PointDeVente (PUT)
function updatePointDeVente(req, res) {
    console.log("UPDATE recu PointDeVente : ");
    console.log(req.body);
    PointDeVente.findByIdAndUpdate(
      req.body._id,
      req.body,
      { new: true },
      (err, pointDeVente) => {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          res.json({ message: "Mise à jour" });
        }
      }
    );
  }
  
  // suppression d'un PointDeVente (DELETE)
  function deletePointDeVente(req, res) {
    PointDeVente.findByIdAndRemove(req.params.id, (err, pointDeVente) => {
      if (err) {
        res.send(err);
      }
      res.json({ message: `${pointDeVente.nomDuLieu} supprimer` });
    });
  }

  function getPariByType(req,res){
    let typePari = req.params.type;
    PointDeVente.find({ idTypePari: typePari }, (err, champ) => {
      if (err) {
        res.send(err);
      }
      res.json(champ);
    });
  }

  module.exports = {
    getPointDeVentes,
    postPointDeVente,
    getPointDeVente,
    updatePointDeVente,
    deletePointDeVente,
    getPariByType,
  };