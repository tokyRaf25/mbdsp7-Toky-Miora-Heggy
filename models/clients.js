let mongoose = require('mongoose');
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let Schema = mongoose.Schema;

let ClientSchema = Schema({
    name: String,
    email: String,
    jetons: Number,
    password: String
});

ClientSchema.plugin(aggregatePaginate);

module.exports = mongoose.model('Clients',ClientSchema);

