let PariSport = require('../models/parie_sport');
const CategorieService = require ('../service/categorie.service');
const ChampService = require ('../service/champ_par_categorie_paris.service');
const CoteService = require ('../service/cote.service');
var ObjectId = require('mongodb').ObjectId; 
const ResultatPredit_model = require('../models/resultats_predit');
const jwt = require('jsonwebtoken');
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

let getPariSportByIdAsync = async(pariSportId)=>{
	let resultat = await PariSport.findOne({ _id: pariSportId });
	return resultat;
}

let getAllPariByUserId2 = async(userId)=>{
    const setPari = new Set();
    const listPariSportDuplicated = await ResultatPredit_model.find({ idClient: userId }).select('idPariSport');
    //.distinct('idPariSport');
    if(listPariSportDuplicated && listPariSportDuplicated.length>0){
      listPariSportDuplicated.forEach(element => setPari.add(
        element.idPariSport
      ));
    }
    let array = Array.from(setPari);
    return getPariSportAsync(array);
  }

let getPariSportValide = async(req, res)=>{
    var aggregateQuery = PariSport.aggregate(); 
	let userId = req.params.userId;
	let pariUser = await getAllPariByUserId2(userId);	
	var liste_pari = await PariSport.aggregatePaginate(
		aggregateQuery,
		{
		  page: parseInt(req.query.page) || 1,
		  limit: parseInt(req.query.limit) || 10,
		}
	  );

	var resultat = {
		docs: [],
		totalDocs: liste_pari.totalDocs,
		limit: liste_pari.limit,
		page: liste_pari.page,
		totalPages: liste_pari.totalPages,
		pagingCounter: liste_pari.pagingCounter,
		hasPrevPage: liste_pari.hasPrevPage,
		hasNextPage: liste_pari.hasNextPage,
		prevPage: liste_pari.prevPage,
		nextPage: liste_pari.nextPage
	}
	var date = new Date().toISOString()
		.replace(/T/, ' ')
		.replace(/\..+/, '');
	await liste_pari.docs.forEach(async(element)=> {
		if(element.dateDuMatch>date.toString()){
			//let reponse = await ifObjectIsInArray(pariUser, element);
			await ifObjectIsInArray(pariUser, element).then(function callBack(reponse){
				if(!reponse){
					resultat.docs.push(element);
				}
			});
		}
	});
	res.send(resultat);
}


let ifObjectIsInArray = async(tab, pari)=>{
	var reponse = false;
	tab.forEach(async(element)=>{
		if(JSON.stringify(element._id)===JSON.stringify(pari._id)){
			reponse = true;
		}
						
	});
	return reponse;
}

 let getPariSportAsync = async(pariSport)=> {
	 try{
		//console.log("each pari!"+pariSport);
		//return await PariSport.findOne({ _id: pariSport  });
		return await PariSport.find().where('_id').in(pariSport).exec();
	}catch(err){
		 throw err;
	 }
	
    /*PariSport.findOne({ _id: pariSportId }, (err, pariSport) => {
      if (err) {
        res.send(err);
      }
      res.json(pariSport);
    });*/
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
   try { 
	const token = req.body.token; 
	console.log("token",token);
	if(!token || typeof token ==='undefined') res.status(403).send("token error");
   
	const user =  jwt.verify(token,'supersecret');
	console.log("user",{user,token});
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
		  res.json({ message: `${pariSport._id} enregistrer!` });
		});
	}
	catch(e) { 
		if(e.name==='TokenExpiredError') { 
			res.status(403).send({error:"Veuillez se reconnecter , votre session a expiré"});
		}
		res.send(e);
    }
  }


// Update d'un PariSport (PUT)
function updatePariSport(req, res) {
	try { 
	    const token = req.body.token; 
	    console.log("token",token);
	    if(!token || typeof token ==='undefined') res.status(403).send("token error");
		const user =  jwt.verify(token,'supersecret');
	
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
			  res.json({ message: "Mise à jour" });
			}
		  }
		);
	}
	catch(e) { 
		if(e.name==='TokenExpiredError') { 
			res.status(403).send({error:"Veuillez se reconnecter , votre session a expiré"});
		}
		res.send(e);
    }
  }
  
  // suppression d'un PariSport (DELETE)
  function deletePariSport(req, res) {
	try { 
	   const token = req.query.token; 
	   console.log("token",token);
	   if(!token || typeof token ==='undefined') res.status(403).send("token error");
	   
	   const user =  jwt.verify(token,'supersecret');
	  
		  
		PariSport.findByIdAndRemove(req.params.id, (err, pariSport) => {
			if (err) {
			res.send(err);
		  }
		  res.json({ message: `${pariSport.autres_info} supprimer` });
		});
	}
	catch(e) { 
		if(e.name==='TokenExpiredError') { 
			res.status(403).send({error:"Veuillez se reconnecter , votre session a expiré"});
		}
		res.send(e);
    }
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
			let test = Array();
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
							if(tempChamp.cote.length>0){
								resultPari.docs[i].Categorie[j].champ[count] =tempChamp;
							}else{
								test.push(j);
							}
							
						}
						
					}
			}
			//console.log(test.length);
			for(let a = 0;a<test.length;a++){
				resultPari.docs[0].Categorie.splice(test[a]);
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
	getDetailPari,
	getPariSportAsync,
	getPariSportValide,
	getPariSportByIdAsync
  };
