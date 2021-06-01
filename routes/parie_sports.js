let PariSport = require('../model/parie_sport');


//Récupérer tous les PariSports (GET), avec paggination
function getPariSports(req, res){
    var aggregateQuery = PariSport.aggregate(); 
    
    PariSport.aggregatePaginate(
    aggregateQuery,
    {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    },
    (err, parisport) => {
      if (err) {
        res.send(err);
      }
      res.send(parisport);
    }
  );
}

//Récupérer un PariSport par son id (GET)
function getPariSport(req, res) {
    let pariSportId = req.params.id;
  
    PariSport.findOne({ id: pariSportId }, (err, pariSport) => {
      if (err) {
        res.send(err);
      }
      res.json(pariSport);
    });
}

// Ajout d'un assignment (POST)
function postPariSport(req, res) {
    let pariSport = new PariSport();
    pariSport.id = req.body.id;
    pariSport.idTypePari = req.body.idTypePari;
    pariSport.dateDebut = req.body.dateDebut;
    pariSport.dateFin = req.body.dateFin;
    pariSport.autres_info = req.body.autres_info;
    pariSport.status = req.body.status;
  
    console.log("POST parieSport reçu :");
    console.log(pariSport);
  
    PariSport.save((err) => {
      if (err) {
        res.send("cant post parieSport ", err);
      }
      res.json({ message: `${PariSport.idChamp} saved!` });
    });
  }


// Update d'un PariSport (PUT)
function updatePariSport(req, res) {
    console.log("UPDATE recu PariSport : ");
    console.log(req.body);
    PariSport.findByIdAndUpdate(
      req.body._id,
      req.body,
      { new: true },
      (err, pariSport) => {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          res.json({ message: "updated" });
        }
      }
    );
  }
  
  // suppression d'un PariSport (DELETE)
  function deletePariSport(req, res) {
    PariSport.findByIdAndRemove(req.params.id, (err, pariSport) => {
      if (err) {
        res.send(err);
      }
      res.json({ message: `${pariSport.autres_info} deleted` });
    });
  }

  module.exports = {
    getPariSports,
    postPariSport,
    getPariSport,
    updatePariSport,
    deletePariSport
  };