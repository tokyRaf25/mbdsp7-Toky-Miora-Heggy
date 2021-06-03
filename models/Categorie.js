const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CategorieSchema = new Schema({
   nomcategorie : String
});


// Export the model
module.exports = mongoose.model('Categorie', CategorieSchema,'Categories');