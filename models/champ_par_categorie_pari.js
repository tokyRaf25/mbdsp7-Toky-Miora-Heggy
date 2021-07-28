let mongoose = require('mongoose');
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let Schema = mongoose.Schema;

let ChampParCategorieSchema = Schema({
    idCategorie: String,
    nomChamp: String
});

ChampParCategorieSchema.plugin(aggregatePaginate);

module.exports = mongoose.model('Champ',ChampParCategorieSchema);
