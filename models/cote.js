let mongoose = require('mongoose');
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let Schema = mongoose.Schema;

let CoteSchema = Schema({
    idParieSport: Number,
    idChamp: Number,
    cotes: Number
});

CoteSchema.plugin(aggregatePaginate);

module.exports = mongoose.model('Cote',CoteSchema);