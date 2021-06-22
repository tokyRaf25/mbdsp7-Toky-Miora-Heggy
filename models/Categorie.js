const mongoose = require('mongoose');
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const Schema = mongoose.Schema;

let CategorieSchema = new Schema({
   nomcategorie : String,
   idTypeParis:String
});

CategorieSchema.plugin(aggregatePaginate);
// Export the model
module.exports = mongoose.model('Categorie', CategorieSchema,'Categories');