let mongoose = require('mongoose');
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let Schema = mongoose.Schema;

let ResultatReelSchema = Schema({
    idPariSport: Number,
    idChamp: Number,
    cote: Number,
    resultat: Number // Oui ou Non
});

ResultatReelSchema.plugin(aggregatePaginate);

module.exports = mongoose.model('ResultatReel',ResultatReelSchema);