const express = require('express');
var bcrypt = require('bcryptjs');
var Client = require('../models/clients');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const clients = require('../models/clients');
// routes


function authenticate(req, res, next) {
        console.log(req.body);
        Client.findOne({ name: req.body.name }, function (err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('Aucun utilisateur correspondant.');

        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

        var token = jwt.sign({ id: user._id }, 'supersecret', {
            expiresIn: 86400 // expires in 24 hours
        });

        res.status(200).send({ id: user.id, name: user.name, auth: true, token: token,jetons:user.jetons,password:user.password,email:user.email });
    });
}

function register(req, res) {
    let Client = new clients();
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    Client.name = req.body.name;
    Client.email = req.body.email;
    Client.jetons = req.body.jetons;
    Client.password = hashedPassword;

    Client.save((err) => {
        if (err) {
            console.log(err);
            res.status(404).json({ err });
        }
        res.json({ message: `Enregistrer!` });
    });
}

function getClientById(req, res){
    let idClient = req.params.id;
    
    Client.findOne({ _id: idClient }, (err, champ) => {
      if (err) {
        res.send(err);
      }
      res.json(champ);
    });
  }

updateClient = async (req,res) => {
	
		Client.findByIdAndUpdate(
		req.body._id,
		req.body,
		{ new: true },
		(err, client) => {
			console.log("POST résultat prédit reçu :");
			console.log(req.body);
		  if (err) {
			console.log(err);
			res.send(err);
		  } else {
			res.json({ message: "Mise à jour" });
		  }
		});
	
	
}
listClient = async ( req , res ) => { 
   var clientQuery = Client.aggregate();
  
	  Client.aggregatePaginate(
		clientQuery,
		{
		  page: parseInt(req.query.page) || 1,
		  limit: parseInt(req.query.limit) || 10,
		},
		(err, clients) => {
		  if (err) {
			res.send(err);
		  }
		  res.send(clients);
		}
	  );
}
deleteClient =  async(req,res) =>{
	Client.findByIdAndRemove(req.params.id, (err, client) => {
		if (err) {
			res.send(err);
		}
		res.json({ message: `${client.name} supprimer` });
	});
}
let getJetonClient = async(idClient)=>{
  var jetons = 0
  let client = await Client.findOne({ _id: idClient}, (err,client)=> {
    if(err){
      console.log(err); 
    }
  });
  return client.jetons;
}
let updateJetonsClient = async (idClient,jetons) =>{
  let jetons_bef = await getJetonClient(idClient);
  console.log("le nombre de jetons initiale "+jetons_bef);
  await Client.updateMany(
    { 
      "_id" : idClient
    }, 
    { "$set" : { "jetons" : jetons_bef+jetons } }, 
    { "upsert" : true },(err,rep)=>{
      if (err) {
        res.send(err);
        }		
  });
}


module.exports = {
    authenticate,
    register,
    getClientById,
	updateClient,
	listClient,
	deleteClient,
	updateJetonsClient,
	getJetonClient
  }
