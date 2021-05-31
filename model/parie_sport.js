let mongoose = require('mongoose');
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let Schema = mongoose.Schema;

let PariSportSchema = Schema({
    id: Number,
    dateDebut: Date,
    dateFin: Date,
    autres_info: String,
    status: String
});

ParieSportSchema.plugin(aggregatePaginate);

module.exports = mongoose.models('pari_sport',PariSportSchema);