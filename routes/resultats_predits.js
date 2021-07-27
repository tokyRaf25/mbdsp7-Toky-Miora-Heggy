let ResultatPredit = require('../models/resultats_predit');
let PariSport = require('./parie_sports')
let Client = require('../models/clients')
let Client_service = require('./clients');
let Champ = require('./champ_par_categorie_paris');
let Categorie = require('./categorie.route');

//Récupérer tous les ResultatPredits (GET), avec paggination
function getResultatPredits(req, res){
    var aggregateQuery = ResultatPredit.aggregate(); 
    
    ResultatPredit.aggregatePaginate(
    aggregateQuery,
    {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    },
    (err, resultatPredit) => {
      if (err) {
        res.send(err);
      }
      res.send(resultatPredit);
    }
  );
}

let getResultatPreditsWithoutPagginate = async(idPariSport,idChamp) =>{
  try{
    return await ResultatPredit
    .find()
    .where('idPariSport').equals(idPariSport)
    .where('idChamp').equals(idChamp);
  }catch(err){
    throw err;
  }
}

//Récupérer un ResultatPredit par son id (GET)
function getResultatPredit(req, res) {
    console.log("get résultat prédit by id "+req.params.id)
    let resultatPreditId = req.params.id;
  
    ResultatPredit.findOne({ _id: resultatPreditId }, (err, resultatPredit) => {
      if (err) {
        res.send(err);
      }
      res.json(resultatPredit);
    });
}

// Ajout d'un assignment (POST)
/*function postResultatPredit(req, res) {
    let resultatPredit = new ResultatPredit();
    resultatPredit.idClient = req.body.idClient;
    resultatPredit.idChamp = req.body.idChamp;
    resultatPredit.idPariSport = req.body.idPariSport;
    resultatPredit.cotes = req.body.cotes;
    resultatPredit.mise = req.body.mise;
    resultatPredit.gain = req.body.gain;
    resultatPredit.status = req.body.status;
    resultatPredit.dateDePari = req.body.dateDePari;

    console.log("POST résultat prédit reçu :");
    console.log(resultatPredit);
  
    resultatPredit.save((err) => {
      if (err) {
        res.send("cant post resultatPredit ", err);
      }
      res.json({ message: `${resultatPredit._id} saved!` });
    });
  }*/

  let postResultatPredit = async(req, res)=> {
    let resultatPredit = new ResultatPredit();
    var clientFind = null;
    resultatPredit.idClient = req.body.idClient;
    resultatPredit.idChamp = req.body.idChamp;
    resultatPredit.idPariSport = req.body.idPariSport;
    resultatPredit.cotes = req.body.cotes;
    resultatPredit.mise = req.body.mise;
    resultatPredit.gain = req.body.gain;
    resultatPredit.status = req.body.status;
    resultatPredit.dateDePari = req.body.dateDePari;
    let miseTotal = req.body.miseTotal;
    console.log("mise total ="+miseTotal);

    Client.findOne({ _id: resultatPredit.idClient }, async(err, client)=> {
      if(client.jetons<miseTotal){
        res.json({
          status: `erreur`, 
          message: `Vous n'avez que ${client.jetons} jetons! impossible de valider votre commande!` });
      }else{
        //console.log("POST résultat prédit reçu :");
        //console.log(resultatPredit);
        await Client_service.updateJetonsClient(resultatPredit.idClient, -miseTotal);
        resultatPredit.save((err) => {
          if (err) {
            res.json({
              status: `erreur`, 
              message: `Can't post résultat prédit!` 
            });
          }
          res.json({
            status: `ok`, 
            message: `${resultatPredit._id} saved!` 
          });
        });
      }
    });

   
  }

// Update d'un ResultatPredit (PUT)
function updateResultatPredit(req, res) {
    console.log("UPDATE recu ResultatPredit : ");
    console.log(req.body);
    ResultatPredit.findByIdAndUpdate(
      req.body._id,
      req.body,
      { new: true },
      (err, resultatPredit) => {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          res.json({ message: "updated" });
        }
      }
    );
  }
  
  // suppression d'un ResultatPredit (DELETE)
  function deleteResultatPredit(req, res) {
    ResultatPredit.findByIdAndRemove(req.params.id, (err, resultatPredit) => {
      if (err) {
        res.send(err);
      }
      res.json({ message: `${resultatPredit.autres_info} deleted` });
    });
  }

  function getPariByType(req,res){
    let typePari = req.params.type;
    ResultatPredit.find({ idTypePari: typePari }, (err, champ) => {
      if (err) {
        res.send(err);
      }
      res.json(champ);
    });
  }
  
  function updateOne(req,res){
	  ResultatPredit.updateMany(
			{ "idPariSport" : req.params.id}, 
			{ "$set" : { "status" : "1" } }, 
			{ "upsert" : true },(err,rep)=>{
				if (err) {
					res.send(err);
				  }
				res.json(rep);			
	  });
  }

  let updateToOne = async(idPariSport, idChamp, res)=>{
    ResultatPredit.updateMany(
			{ 
        "idPariSport" : idPariSport,
        "idChamp":idChamp
      }, 
			{ "$set" : { "status" : "1" } }, 
			{ "upsert" : true },(err,rep)=>{
				if (err) {
					res.send(err);
				  }		
	  });
  }

  function deleteResultatPreditByPariSportIdAndUser(req, res){
    console.log("suppression d'un pari sport!");
    let idPariSport = req.params.idPariSport;
    let userId = req.params.userId;
    ResultatPredit.deleteMany({ 
      idPariSport: idPariSport
     }, (err, pari) => {
      if (err) {
        res.send(err);
      }
      res.json({ message: `${idPariSport} deleted` });
    });
  }

  let getResultatPariAndUser = async(req,res)=>{
    let idPariSport = req.params.idPariSport;
    let resultFinal = [];
    let userId = req.params.userId;
    let resultat  = await ResultatPredit.find(
      { 
        idPariSport: idPariSport,
        idClient: userId
      }
    );
    let pariSport = await PariSport.getPariSportByIdAsync(idPariSport);
    
    console.log(resultat);
    for (const rePred of resultat){
       let champ = await Champ.getChampByIdAsync(rePred.idChamp);
       console.log(champ);
       let cat = await Categorie.getCategorieByIdAsync(champ.idCategorie);
           let temp = {
            _id: rePred._id,
            idClient: rePred.idClient,
            champ: champ.nomChamp,
            categorie: cat.nomcategorie,
            pariSport: pariSport,
            cotes: rePred.cotes,
            mise: rePred.mise,
            gain: rePred.gain,
            status: rePred.status,
            dateDePari: rePred.dateDePari,
            __v: rePred.__v
          };
         resultFinal.push(temp);
    }
   res.send(resultFinal);
  }

  //Paris en cours
  let getAllPariByUserId = async(req, res)=>{
    console.log("tonga ato ver lery!");
    let userId = req.params.userId;
    console.log("userId "+userId);
    const setPari = new Set();
    const exclus = new Set();
    const listPariSportDuplicated = await ResultatPredit.find({ idClient: userId }).select('idPariSport status');
    //.distinct('idPariSport');
    if(listPariSportDuplicated && listPariSportDuplicated.length>0){
      listPariSportDuplicated.forEach(function(element){
        console.log(element);
        if(element.status==1){
          exclus.add(element.idPariSport);
        }
        setPari.add(
          element.idPariSport
        );
      });
    }
    let arrayPari = Array.from(setPari);
    let arrayExclus = Array.from(exclus);

    const arrayFinal = arrayPari.filter(value => !arrayExclus.includes(value));

    let les_paris = await PariSport.getPariSportAsync(arrayFinal);
    return res.send(les_paris);
  }

  let getAllPariByUserIdEnd = async(req, res)=>{
    console.log("tonga ato ver lery!");
    let userId = req.params.userId;
    console.log("userId "+userId);
    const setPari = new Set();
    const exclus = new Set();
    const listPariSportDuplicated = await ResultatPredit.find({ idClient: userId }).select('idPariSport status');
    //.distinct('idPariSport');
    if(listPariSportDuplicated && listPariSportDuplicated.length>0){
      listPariSportDuplicated.forEach(function(element){
        console.log(element);
        if(element.status==1){
          exclus.add(element.idPariSport);
        }
        setPari.add(
          element.idPariSport
        );
      });
    }
    let arrayPari = Array.from(setPari);
    let arrayExclus = Array.from(exclus);

    const arrayFinal = arrayPari.filter(value => arrayExclus.includes(value));

    let les_paris = await PariSport.getPariSportAsync(arrayFinal);
    return res.send(les_paris);
  }


  module.exports = {
    getResultatPredits,
    postResultatPredit,
    getResultatPredit,
    updateResultatPredit,
    deleteResultatPredit,
    getPariByType,
	  updateOne,
    deleteResultatPreditByPariSportIdAndUser,
    getAllPariByUserId,
    getResultatPreditsWithoutPagginate,
    updateToOne,
    getAllPariByUserIdEnd,
    getResultatPariAndUser
  };
