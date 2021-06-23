var express = require('express');
var app = express();
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let cote = require('./routes/cotes');

//Déclaration des objets
let cote = require('./routes/cotes');
let champ = require('./routes/champ_par_categorie_paris');
let pari = require('./routes/parie_sports');
const ParieRoutes = require('./routes/typeParie.route'); 
const CategorieRoutes = require('./routes/categorie.route');
const resultatReel = require('./routes/resultats_reels');
const resultatPredit = require('./routes/resultats_predits');
const pointDeVente = require('./routes/point_de_ventes');

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

/************************Routes API champParCategorie************************************** */
app.route(prefix + '/champParCat')
  .get(champ.getChamps)
  .post(champ.postChamp)
  .put(champ.updateChamp);

app.route(prefix + '/champParCat/:id')
  .delete(champ.deleteChamp);
  
app.route(prefix + '/champParCat/trie')
  .get(champ.getChampParCategorie)

app.route(prefix + '/champParCat/:id')
  .get(champ.getChampByIdCategorie)
  .delete(champ.deleteChamp)
/******************************************************************* */  

/************************Routes API PariSport************************************** */
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

/******************************************************************* */

/************************Routes API Cote************************************** */
app.route(prefix + '/cote')
  .get(cote.getCotes) 
  .post(cote.postCote)
  .put(cote.updateCote);
  
app.route("/cote/:id")
  .get(cote.getCote)
  .delete(cote.deleteCote);

/******************************************************************* */ 

/************************Routes API Résultats réels************************************** */
app.route(prefix + '/resultats_reel')
  .get(resultatReel.getResultatReels) 
  .post(resultatReel.postResultatReel)
  .put(resultatReel.updateResultatReel);
  
app.route("/resultats_reel/:id")
.get(resultatReel.getResultatReel)
  .delete(resultatReel.deleteResultatReel);

/******************************************************************* */  

/************************Routes API Résultats prédites************************************** */
app.route(prefix + '/resultats_predit')
  .get(resultatPredit.getResultatPredits) 
  .post(resultatPredit.postResultatPredit)
  .put(resultatPredit.updateResultatPredit);
  
app.route(prefix +"/resultats_predit/:id")
.get(resultatPredit.getResultatPredit)
  .delete(resultatPredit.deleteResultatPredit);

/******************************************************************* */  

/************************Routes API Type de parie************************************** */
app.route(prefix +"/typeParie")
  .get(ParieRoutes.listTypeParie) 
  .post(ParieRoutes.insertTypeParie)
  .put(ParieRoutes.updateTypeParie);
  
app.route(prefix +"/typeParie/:id")
  .delete(ParieRoutes.deleteTypeParie);

/******************************************************************* */  

/************************Routes API Type de categorie************************************** */

app.route(prefix +"/categorie")
  .get(CategorieRoutes.listCategorie)
  .post(CategorieRoutes.insertCategorie)
  .put(CategorieRoutes.updateCategorie);
  
app.route(prefix +"/categorie/:id")
  .delete(CategorieRoutes.deleteCategorie)
  .get(CategorieRoutes.getListCategorieParTp);

/******************************************************************* */  

/************************Routes API Points de ventes************************************** */
app.route(prefix + '/point_de_vente')
  .get(pointDeVente.getPointDeVentes) 
  .post(pointDeVente.postPointDeVente)
  .put(pointDeVente.updatePointDeVente);
  
app.route(prefix +"/point_de_vente/:id")
  .get(pointDeVente.getPointDeVente)
  .delete(pointDeVente.deletePointDeVente);

/******************************************************************* */  


app.listen(4000, function () {
  console.log("Application d'exemple écoutant sur le port 4000 !");
});

