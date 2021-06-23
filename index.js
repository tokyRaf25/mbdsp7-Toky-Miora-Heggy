var express = require('express');
var app = express();
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let cote = require('./routes/cotes');

//Déclaration des objets
let champ = require('./routes/champ_par_categorie_paris');
let pari = require('./routes/parie_sports');
const ParieRoutes = require('./routes/typeParie.route'); 
const CategorieRoutes = require('./routes/categorie.route');

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

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
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

app.route(prefix + '/champParCat/:id')
  .delete(champ.deleteChamp);
  
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
  
app.route(prefix + '/pariOne')
  .get(pari.getLastPari)

app.route("/typeParie")
  .get(ParieRoutes.listTypeParie) 
  .post(ParieRoutes.insertTypeParie)
  .put(ParieRoutes.updateTypeParie);
  
app.route("/typeParie/:id")
  .delete(ParieRoutes.deleteTypeParie);
  
app.route("/categorie")
  .get(CategorieRoutes.listCategorie)
  .post(CategorieRoutes.insertCategorie)
  .put(CategorieRoutes.updateCategorie);
  
app.route("/categorie/:id")
  .delete(CategorieRoutes.deleteCategorie)
  .get(CategorieRoutes.getListCategorieParTp);

app.route(prefix + '/cote')
  .get(cote.getCotes) 
  .post(cote.postCote)
  .put(cote.updateCote);
  
app.route("/cote/:id")
  .get(cote.getCote)
  .delete(cote.deleteCote);
  
app.listen(4000, function () {
  console.log("Application d'exemple écoutant sur le port 4000 !");
});

