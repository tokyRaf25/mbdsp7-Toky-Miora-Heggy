let mongoose = require('mongoose');
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let Schema = mongoose.Schema;

let PariSportSchema = Schema({
    id: Number,
    idTypePari: Number, //Foot, Course cheval??
    dateDebut: Date,
    dateFin: Date,
    autres_info: String,
    status: String
});

ParieSportSchema.plugin(aggregatePaginate);

module.exports = mongoose.models('PariSport',PariSportSchema);