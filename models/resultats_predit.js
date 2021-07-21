let mongoose = require('mongoose');
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let Schema = mongoose.Schema;

let ResultatPreditSchema = Schema({
    idClient: String,
    idChamp: String,
    idPariSport: String,
    cotes: Number,
    mise: Number,
    gain: Number,
    status: Number,
    dateDePari: String // Montant = mise * resultatReel.cote
});

ResultatPreditSchema.plugin(aggregatePaginate);

module.exports = mongoose.model('ResultatPredit',ResultatPreditSchema,'resultatPredit');