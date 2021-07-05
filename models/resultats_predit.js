let mongoose = require('mongoose');
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let Schema = mongoose.Schema;

let ResultatPreditSchema = Schema({
    idResultatsReel: Number,
    idClient: Number,
    mise: Number,
    montant: Number // Montant = mise * resultatReel.cote
});

ResultatPreditSchema.plugin(aggregatePaginate);

module.exports = mongoose.model('ResultatPredit',ResultatPreditSchema);