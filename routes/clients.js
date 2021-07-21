const express = require('express');
var bcrypt = require('bcryptjs');
var Client = require('../models/clients');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const clients = require('../models/clients');
// routes


function authenticate(req, res, next) {
        Client.findOne({ name: req.body.name }, function (err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');

        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

        var token = jwt.sign({ id: user._id }, 'supersecret', {
            expiresIn: 86400 // expires in 24 hours
        });

        res.status(200).send({ id: user.id, name: user.name, jetons: user.jetons, auth: true, token: token });
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
        res.json({ message: `saved!` });
    });
}

// Update information client (PUT)
function updateClient(req, res) {
  console.log("UPDATE client : ");
  console.log(req.body);
  Client.findByIdAndUpdate(
    req.body._id,
    req.body,
    { new: true },
    (err, client) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.json({ message: "updated" });
      }
    }
  );
}

//Récupérer jeton client par son id (GET)
function getJetonClient(req, res) {
    console.log("get jeton client by id "+req.params.id)
    let clientId = req.params.id;
  
    Client.findOne({ _id: clientId }, (err, client) => {
      if (err) {
        res.send(err);
      }
      res.json(client);
    });
}

// Update jeton client (PUT)
function updateJeton(req, res) {
    console.log("UPDATE jeton : ");
    console.log(req.body);
    Client.findByIdAndUpdate(
      req.body._id,
      req.body,
      { new: true },
      (err, client) => {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          res.json({ message: "updated" });
        }
      }
    );
  }


module.exports = {
    authenticate,
    register,
    updateJeton,
    getJetonClient,
    updateClient
  };