var express = require('express');
var app = express();
let mongoose = require('mongoose');
let bodyParser = require('body-parser');

//Déclaration des objets
let champ = require('./routes/champ_par_categorie_paris');
let pari = require('./routes/parie_sports');
mongoose.Promise = global.Promise;

//Connexion à la base de donnée mongoDB
const uri='mongodb+srv://tpt_tmh:EjUbrdYdtqlrscAV@cluster0.qiuua.mongodb.net/paridb?retryWrites=true&w=majority';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify:false
};

// Pour les formulaires
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect(uri, options)
  .then(() => {
    console.log("Connecté à la base MongoDB assignments dans le cloud !");
    },
    err => {
      console.log('Erreur de connexion: ', err);
    });

// '/' est la route racine
app.get('/', function (req, res) {
  res.send('Bonjour !');
});


// les routes
const prefix = '/api';

//Champ par categorie
app.route(prefix + '/champParCat')
  .get(champ.getChamps)
  .post(champ.postChamp)
  .put(champ.updateChamp);

  
app.route(prefix + '/champParCat/trie')
  .get(champ.getChampParCategorie)

//Champ par categorie
app.route(prefix + '/pari')
  .get(pari.getPariSports)
  .post(pari.postPariSport)
  .put(pari.updatePariSport);

app.route(prefix + '/pari/:id')
  .get(pari.getPariSport)
  .delete(pari.deletePariSport);

  app.route(prefix + '/pari/type/:type')
  .get(pari.getPariByType)

app.listen(4000, function () {
  console.log("Application d'exemple écoutant sur le port 4000 !");
});

