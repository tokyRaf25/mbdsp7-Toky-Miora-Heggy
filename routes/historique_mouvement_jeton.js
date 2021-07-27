let MouvementJeton = require('../models/historique_mouvement_jeton');


//Récupérer un cote par son id (GET)
function getMouvementJeton(req, res) {
    let datemouvement = req.query.dateMouvement;
    let id = req.query.idClient;
    let type = req.query.typeMouvement;
  
    MouvementJeton.find({ idClient: id, dateMouvement: datemouvement }, (err, mouvementjeton) => {
      if (err) {
        res.send(err);
      }
      res.json({"docs":mouvementjeton});
    });
}

// Ajout d'un MouvementJeton (POST)
function insertMouvementJeton(req, res) {
  console.log("execution d'une requete POST!");
    let mouvementjeton = new MouvementJeton();
    mouvementjeton.idClient = req.body.idClient;
    mouvementjeton.typeMouvement = req.body.typeMouvement;
    mouvementjeton.jeton = req.body.jeton;
    mouvementjeton.dateMouvement = req.body.dateMouvement;
  
    console.log("POST mouvementjeton reçu :");
    console.log(mouvementjeton);
  
    mouvementjeton.save((err) => {
      if (err) {
        res.send("cant insert MouvementJeton ", err);
      }
      res.json({ message: `${mouvementjeton.typeMouvement} saved!` });
    });
  }


  module.exports = {
    getMouvementJeton,
    insertMouvementJeton
  };