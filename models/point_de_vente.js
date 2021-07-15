let mongoose = require('mongoose');
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let Schema = mongoose.Schema;

let PointDeVenteSchema = Schema({
    nomDuLieu: String,
    latitude: Number,
    longitude: Number
});

PointDeVenteSchema.plugin(aggregatePaginate);

module.exports = mongoose.model('PointDeVente',PointDeVenteSchema);