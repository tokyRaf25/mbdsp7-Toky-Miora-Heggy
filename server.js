var express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var app = express();
const ParieRoutes = require('./routes/typeParie.route'); 
const CategorieRoutes = require('./routes/categorie.route');

app.use(bodyParser.json());

mongoose.connect("mongodb+srv://tpt_tmh:EjUbrdYdtqlrscAV@cluster0.qiuua.mongodb.net/paridb?retryWrites=true&w=majority");

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

app.listen(8000);
console.log("Listening on 8000...");

