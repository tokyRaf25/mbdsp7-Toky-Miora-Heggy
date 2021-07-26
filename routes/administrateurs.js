const express = require('express');
var bcrypt = require('bcryptjs');
var Admin = require('../models/administrateurs');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
// routes


function authenticate(req, res, next) {
    Admin.findOne({ login: req.body.login }, function (err, user) {
    if (err) return res.status(500).send('Error on the server.');
    if (!user) return res.status(404).send('Aucun utilisateur correspondant.');

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

    var token = jwt.sign({ id: user._id }, 'supersecret', {
        expiresIn: 86400 // expires in 24 hours
    });

    res.status(200).send({ id: user.id, login: user.login, auth: true, token: token });
});
}

function register(req, res) {
let admin = new Admin();
var hashedPassword = bcrypt.hashSync(req.body.password, 8);
admin.login = req.body.login;
admin.password = hashedPassword;

admin.save((err) => {
    if (err) {
        console.log(err);
        res.status(404).json({ err });
    }
    res.json({ message: `saved!` });
});
}



module.exports = {
    authenticate,
    register,
  };