let mongoose = require('mongoose');
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let Schema = mongoose.Schema;

let ChampParCategorieSchema = Schema({
    id: Number,
    idCategorie: Number,
    nomChamp: String,
    cotes: Number
});

ChampParCategorieSchema.plugin(aggregatePaginate);

module.exports = mongoose.models('pari_sport',ChampParCategorieSchema);