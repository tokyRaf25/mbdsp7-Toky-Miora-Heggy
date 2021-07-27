const categorie =  require("../models/Categorie");
const jwt = require('jsonwebtoken');
let Champ = require('../models/champ_par_categorie_pari');
const ChampService = require ('../service/champ_par_categorie_paris.service');
const CoteService = require ('../service/cote.service');
var ObjectId = require('mongodb').ObjectId;
listCategorie = async ( req , res ) => { 
   var categorieQuery = categorie.aggregate();
  
	  categorie.aggregatePaginate(
		categorieQuery,
		{
		  page: parseInt(req.query.page) || 1,
		  limit: parseInt(req.query.limit) || 10,
		},
		(err, categories) => {
		  if (err) {
			res.send(err);
		  }
		  res.send(categories);
		}
	  );
}

insertCategorie =  async(req,res) =>{
   try { 
   const token = req.body.token; 
   console.log("token",token);
   if(!token || typeof token ==='undefined') res.status(403).send("token error");
   
   const user =  jwt.verify(token,'supersecret');
   console.log("user",{user,token});
	   let insert = new categorie();
	   insert.nomcategorie = req.body.nomcategorie;
	   insert.idTypePari = req.body.idTypePari;
	   insert.save((err) => {
		if (err) {
		  res.send("cant post categorie ", err);
		}
		res.json({ message: `${insert.nomcategorie} saved!` });
	  });
   }
	catch(e) { 
		if(e.name==='TokenExpiredError') { 
			res.status(403).send({error:"Veuillez se reconnecter , votre session a expiré"});
		}
		res.send(e);
    }
}

deleteCategorie =  async(req,res) =>{
	try { 
	    const token = req.query.token; 
	    console.log("token",token);
	    if(!token || typeof token ==='undefined') res.status(403).send("token error");
	   
	    const user =  jwt.verify(token,'supersecret');
		categorie.findByIdAndRemove(req.params.id, (err, categorie) => {
		if (err) {
		 res.send(err);
		}
		res.json({ message: `${categorie.nomcategorie} deleted` });
		});
	}
	catch(e) { 
		if(e.name==='TokenExpiredError') { 
			res.status(403).send({error:"Veuillez se reconnecter , votre session a expiré"});
		}
		res.send(e);
    }

}

updateCategorie = async (req,res) => {
	try { 
	    const token = req.body.token; 
	    console.log("token",token);
	    if(!token || typeof token ==='undefined') res.status(403).send("token error");
		const user =  jwt.verify(token,'supersecret');
		
		categorie.findByIdAndUpdate(
		req.body._id,
		req.body,
		{ new: true },
		(err, categorie) => {
		  if (err) {
			console.log(err);
			res.send(err);
		  } else {
			res.json({ message: "updated" });
		  }
		});
	}
	catch(e) { 
		if(e.name==='TokenExpiredError') { 
			res.status(403).send({error:"Veuillez se reconnecter , votre session a expiré"});
		}
		res.send(e);
    }
}

getListCategorieParTp = async(req,res)=>{
	try { 
		 var ChampQuery = categorie.aggregate([
			{
				$match : { 
					idTypePari : req.params.id
				}
			}
		 ]);
		 let resultCategorie = await categorie.aggregatePaginate(
			ChampQuery
		 );
		 if(resultCategorie && resultCategorie.docs && resultCategorie.docs.length > 0) { 
			for (let i =0 ; i< resultCategorie.docs.length ; i++) { 
					let resultChamp =  await ChampService.getChampByIdCategorie(resultCategorie.docs[i]._id);
					resultCategorie.docs[i].Champ = resultChamp;
			}
		 }
		 res.send(resultCategorie);
	}
	catch (e) { 
		res.send(e);
		throw e ;
	}
}

function getNomByIdCategorie(idCategorie){
  var result = null;
  categorie.findOne({ _id: idCategorie }, (err, categorie) => {
    result = categorie.nomcategorie;
   });
  return result;
}
 getListCategoryById = async(req,res)=>{
	 var categorieQuery = categorie.aggregate([
			{
				$match : { 
					idTypePari : req.params.id
				}
			}
	 ]);
  
	  categorie.aggregatePaginate(
		categorieQuery,
		{
		  page: parseInt(req.query.page) || 1,
		  limit: parseInt(req.query.limit) || 10,
		},
		(err, categories) => {
		  if (err) {
			res.send(err);
		  }
		  res.send(categories);
		}
	  );
 }

 let getCategorieByIdAsync = async(categorieId)=>{
	let resultat = await categorie.findOne({ _id: categorieId });
	return resultat;
}

function getLastCategorie(req,res){
	var categorieQuery = categorie.aggregate();
  
	  categorie.aggregatePaginate(
		categorieQuery,
		{
		   sort:{_id:-1},
		   limit: 1,
		},
		(err, categories) => {
		  if (err) {
			res.send(err);
		  }
		  res.send(categories);
		}
	  );
}
getListCoteParParie = async(req,res)=>{
	try { 
		 var ChampQuery = categorie.aggregate([
			{
				$match : { 
					_id : new ObjectId(req.params.id)
				}
			}
		 ]);
		 let resultCategorie = await categorie.aggregatePaginate(
			ChampQuery
		 );
		 
		 if(resultCategorie && resultCategorie.docs && resultCategorie.docs.length > 0) { 
			for (let i =0 ; i< resultCategorie.docs.length ; i++) { 
					let resultChamp =  await ChampService.getChampByIdCategorie(resultCategorie.docs[i]._id);
					resultCategorie.docs[i].Champ = resultChamp;
					//console.log(resultCategorie);
					for(let count = 0; count<resultCategorie.docs[i].Champ.length;count++){
						let tempChamp = {...resultCategorie.docs[i].Champ[count]._doc};
						let resultCote = await CoteService.getCoteByIdChamp(resultCategorie.docs[i].Champ[count]._id,req.params.idParie);
						tempChamp.cote = resultCote;
						resultCategorie.docs[i].Champ[count] =tempChamp;
						//console.log(tempChamp);
					
					}
			}
		 }
		 res.send(resultCategorie);
	}
	catch (e) { 
		res.send(e);
		throw e ;
	}
}
module.exports = { 
  listCategorie,
  insertCategorie,
  deleteCategorie,
  updateCategorie,
  getListCategorieParTp,
  getNomByIdCategorie,
  getListCategoryById,
  getLastCategorie,
  getListCoteParParie,
  getCategorieByIdAsync
}
