let mongoose = require('mongoose');
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let Schema = mongoose.Schema;

let CoteSchema = Schema({
    idParieSport: String,
    idChamp: String,
    cotes: Number
});

CoteSchema.plugin(aggregatePaginate);

module.exports = mongoose.model('Cote',CoteSchema,'cotes');