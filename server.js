require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');
let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//mongoose.set('debug', true);

// remplacer toute cette chaine par l'URI de connexion à votre propre base dans le cloud s
//const uri = 'mongodb+srv://Heggy:Heggyiany@cluster0.le4ha.mongodb.net/assignments?retryWrites=true&w=majority';
const uri = 'mongodb+srv://Parie:Parie123@cluster0.qiuua.mongodb.net/paridb?retryWrites=true&w=majority';

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};

mongoose.connect(uri, options)
    .then(() => {
            console.log("Connecté à la base MongoDB assignments dans le cloud !");
            console.log("at URI = " + uri);
        },
        err => {
            console.log('Erreur de connexion: ', err);
        });
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/api', require('./routes/assignments'));
app.use('/administrateur', require('./administrateur/administrateur.controller'));
app.use('/clients', require('./clients/clients.controller'));


// global error handler
app.use(errorHandler);

// start server
const port = process.env.PORT || 4000;
app.listen(port, "0.0.0.0");
console.log('Server listening on port ' + port);
