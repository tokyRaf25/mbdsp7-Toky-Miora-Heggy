const express = require('express');
const router = express.Router();
var bcrypt = require('bcryptjs');
var Admin = require('../model/administrateur');
var Client = require('../model/clients');
var jwt = require('jsonwebtoken');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const config = require('config.json');
const clients = require('../model/clients');
// routes
router.post('/authenticate', authenticate);
router.post('/register', register);

module.exports = router;

function authenticate(req, res, next) {
        Client.findOne({ name: req.body.name }, function (err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');

        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

        var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });

        res.status(200).send({ id: user.id, name: user.name, auth: true, token: token });
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
router.get('/logout', function(req, res) {
    res.status(200).send({ auth: false, token: null });
});
