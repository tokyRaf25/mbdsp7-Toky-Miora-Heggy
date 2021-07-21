var express = require('express');
var app = express();
let mongoose = require('mongoose');
let bodyParser = require('body-parser');

//Déclaration des objets
let champ = require('./routes/champ_par_categorie_paris');
let pari = require('./routes/parie_sports');
const ParieRoutes = require('./routes/typeParie.route'); 
const CategorieRoutes = require('./routes/categorie.route');
const client = require('./routes/clients');
const Admin = require('./routes/administrateurs');
const jwt = require('./_helpers/jwt');
const cors = require('cors');
const errorHandler = require('./_helpers/error-handler');

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
// Pour accepter les connexions cross-domain (CORS)
app.use(cors());

// '/' est la route racine
app.get('/', function (req, res) {
  res.send('Bonjour !');
});

// use JWT auth to secure the api
app.use(jwt());
// les routes
const prefix = '/api';


app.route(prefix + '/authentification')
  .post(client.authenticate)

app.route(prefix + '/registration')
.post(client.register)

app.route(prefix + '/updateJeton')
.post(client.updateJeton)

app.route(prefix + '/updateClient')
.post(client.updateClient)

app.route(prefix + '/updateClientPassword')
.post(client.updateClientPassword)

app.route(prefix + '/getJeton/:id')
.get(client.getJetonClient)

app.route("/authentification")
.post(Admin.authenticate)

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
  .delete(CategorieRoutes.deleteCategorie);

  app.use(errorHandler);

app.listen(4000, function () {
  console.log("Application d'exemple écoutant sur le port 4000 !");
});

