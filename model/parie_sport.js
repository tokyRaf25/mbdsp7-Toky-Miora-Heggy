let mongoose = require('mongoose');
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let Schema = mongoose.Schema;

let PariSportSchema = Schema({
    idTypePari: Number,
    dateDebut: Date,
    dateFin: Date,
    autres_info: String,
    status: String,
    equipes: [{
        nomEquipe: String
    }]
});

PariSportSchema.plugin(aggregatePaginate);

module.exports = mongoose.model('PariSport',PariSportSchema);