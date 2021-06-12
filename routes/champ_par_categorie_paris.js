let Champ = require('../models/champ_par_categorie_pari');


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


// Update d'un cote (PUT)
function updateChamp(req, res) {
    console.log("UPDATE recu Champ : ");
    console.log(req.body);
    Champ.findByIdAndUpdate(
      req.body.id,
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
  
  // suppression d'un cote (DELETE)
  function deleteChamp(req, res) {
    Champ.findByIdAndRemove(req.params.id, (err, champ) => {
      if (err) {
        res.send(err);
      }
      res.json({ message: `${champ.nomChamp} deleted` });
    });
  }


  //Avoir les champs à partir d'une categorie
  function getChampByIdCategorie(){
    let categorieId = req.params.idCategorie;
    Champ.findOne({ idCategorie: categorieId }, (err, champ) => {
      if (err) {
        res.send(err);
      }
      res.json(champ);
    });
  }

  //Avoir les champs par categories
  function getChampParCategorie(){
    
  }

  module.exports = {
    getChamps,
    postChamp,
    getChamp,
    updateChamp,
    deleteChamp,
    getChampByIdCategorie,
    getChampParCategorie
  };