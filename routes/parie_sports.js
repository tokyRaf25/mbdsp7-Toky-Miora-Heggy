let PariSport = require('../models/parie_sport');


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
    console.log("get pari by id "+req.params.id)
    let pariSportId = req.params.id;
  
    PariSport.findOne({ _id: pariSportId }, (err, pariSport) => {
      if (err) {
        res.send(err);
      }
      res.json(pariSport);
    });
}

<<<<<<< HEAD
function getLastPari(req,res){
	var aggregateQuery = PariSport.aggregate(); 
    
    PariSport.aggregatePaginate(
    aggregateQuery,
    {
	  sort:{dateDebut:1},
      limit: 1,
    },
    (err, parisport) => {
      if (err) {
        res.send(err);
      }
      res.send(parisport);
    }
  );
}

=======
>>>>>>> dev-node-api
// Ajout d'un assignment (POST)
function postPariSport(req, res) {
    let pariSport = new PariSport();
    pariSport.idTypePari = req.body.idTypePari;
<<<<<<< HEAD
    pariSport.dateDuMatch = req.body.dateDuMatch;
    pariSport.autres_info = req.body.autres_info;
=======
    pariSport.dateDebut = req.body.dateDebut;
    pariSport.dateFin = req.body.dateFin;
    pariSport.autres_info = req.body.autres_info;
    pariSport.status = req.body.status;
>>>>>>> dev-node-api
    pariSport.equipes = req.body.equipes;
    console.log("POST parieSport reçu :");
    console.log(pariSport);
  
    pariSport.save((err) => {
      if (err) {
        res.send("cant post pariSport ", err);
      }
      res.json({ message: `${pariSport._id} saved!` });
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

  function getPariByType(req,res){
    let typePari = req.params.type;
    PariSport.find({ idTypePari: typePari }, (err, champ) => {
      if (err) {
        res.send(err);
      }
      res.json(champ);
    });
  }

  module.exports = {
    getPariSports,
    postPariSport,
    getPariSport,
    updatePariSport,
    deletePariSport,
    getPariByType,
<<<<<<< HEAD
	getLastPari
=======
>>>>>>> dev-node-api
  };