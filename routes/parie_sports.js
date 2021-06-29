let PariSport = require('../models/parie_sport');
const CategorieService = require ('../service/categorie.service');
const ChampService = require ('../service/champ_par_categorie_paris.service');
const CoteService = require ('../service/cote.service');
var ObjectId = require('mongodb').ObjectId; 
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

function getLastPari(req,res){
	var aggregateQuery = PariSport.aggregate(); 
    
    PariSport.aggregatePaginate(
    aggregateQuery,
    {
	  sort:{_id:-1},
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

// Ajout d'un assignment (POST)
function postPariSport(req, res) {
    let pariSport = new PariSport();
    pariSport.idTypePari = req.body.idTypePari;
    pariSport.dateDuMatch = req.body.dateDuMatch;
    pariSport.autres_info = req.body.autres_info;
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
  
  getDetailPari = async(req,res)=>{
	try { 
		 var PariQuery = PariSport.aggregate([
			{
				$match : { 
					_id : new ObjectId(req.params.id)
				}
			}
		 ]);
		 let resultPari = await PariSport.aggregatePaginate(
			PariQuery
		 );
		 if(resultPari && resultPari.docs && resultPari.docs.length > 0) {
			for (let i = 0 ; i< resultPari.docs.length ; i++) { 
					let resultCategorie =  await CategorieService.getCategorie(resultPari.docs[i].idTypePari);
					resultPari.docs[i].Categorie = resultCategorie;
					for(let j = 0;j<resultPari.docs[i].Categorie.length;j++){
						let tempCategorie = {...resultPari.docs[i].Categorie[j]._doc};
						let resultChamp = await ChampService.getChampByIdCategorie(resultPari.docs[i].Categorie[j]._id);
						tempCategorie.champ = resultChamp;
						resultPari.docs[i].Categorie[j]=tempCategorie;
						for(let count = 0; count<resultPari.docs[i].Categorie[j].champ.length;count++){
							let tempChamp = {...resultPari.docs[i].Categorie[j].champ[count]._doc};
							let resultCote = await CoteService.getCoteByIdChamp(resultPari.docs[i].Categorie[j].champ[count]._id,req.params.id);
							tempChamp.cote = resultCote;
							resultPari.docs[i].Categorie[j].champ[count] =tempChamp;
						}
						
					}
			}
		 }
		 res.send(resultPari);
	}
	catch (e) { 
		res.send(e);
		throw e ;
	}
 }


  module.exports = {
    getPariSports,
    postPariSport,
    getPariSport,
    updatePariSport,
    deletePariSport,
    getPariByType,
	getLastPari,
	getDetailPari
  };