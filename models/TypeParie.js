const mongoose = require('mongoose');
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const Schema = mongoose.Schema;

let TypeParieSchema = new Schema({
   typeParie : String
});

TypeParieSchema.plugin(aggregatePaginate);
// Export the model
module.exports = mongoose.model('TypeParie', TypeParieSchema,'TypeParies');