let mongoose = require('mongoose');
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let Schema = mongoose.Schema;

let PariSportSchema = Schema({
    idTypePari: String,
    dateDuMatch: Date,
    autres_info: String,
    equipes: [{
        nomEquipe: String
    }]
});

PariSportSchema.plugin(aggregatePaginate);

module.exports = mongoose.model('PariSport',PariSportSchema);