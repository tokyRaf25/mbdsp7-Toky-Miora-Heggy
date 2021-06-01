let Champ = require('../model/champ_par_categorie_pari');


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
  
    Champ.findOne({ id: champId }, (err, cote) => {
      if (err) {
        res.send(err);
      }
      res.json(cote);
    });
}

// Ajout d'un assignment (POST)
function postChamp(req, res) {
    let champ = new Champ();
    champ.id = req.body.id;
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
  
  // suppression d'un cote (DELETE)
  function deleteChamp(req, res) {
    Champ.findByIdAndRemove(req.params.id, (err, champ) => {
      if (err) {
        res.send(err);
      }
      res.json({ message: `${champ.nomChamp} deleted` });
    });
  }

  module.exports = {
    getChamps,
    postChamp,
    getChamp,
    updateChamp,
    deleteChamp
  };