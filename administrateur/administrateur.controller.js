const express = require('express');
const router = express.Router();
var bcrypt = require('bcryptjs');
var Admin = require('../model/administrateur');
var jwt = require('jsonwebtoken');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const config = require('config.json');
// routes
router.post('/authenticate', authenticate);
router.post('/register', register);

module.exports = router;

function authenticate(req, res, next) {
        Admin.findOne({ login: req.body.login }, function (err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');

        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

        var token = jwt.sign({ id: user._id }, config.secret, {
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
router.get('/logout', function(req, res) {
    res.status(200).send({ auth: false, token: null });
});
