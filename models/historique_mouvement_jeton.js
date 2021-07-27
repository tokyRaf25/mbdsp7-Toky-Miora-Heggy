let mongoose = require('mongoose');
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let Schema = mongoose.Schema;

let HistoriqueMouvementJetonSchema = Schema({
    idClient: String,
    typeMouvement: String,
    jeton: Number,
    dateMouvement: String
});

HistoriqueMouvementJetonSchema.plugin(aggregatePaginate);

module.exports = mongoose.model('MouvementJeton',HistoriqueMouvementJetonSchema);