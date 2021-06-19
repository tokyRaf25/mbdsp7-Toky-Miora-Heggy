let mongoose = require('mongoose');
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let Schema = mongoose.Schema;

let AdministrateurSchema = Schema({
    login: String,
    password: String
});

AdministrateurSchema.plugin(aggregatePaginate);

module.exports = mongoose.model('Administrateurs',AdministrateurSchema);


