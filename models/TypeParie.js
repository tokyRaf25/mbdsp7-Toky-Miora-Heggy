const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TypeParieSchema = new Schema({
   typeParie : String
});


// Export the model
module.exports = mongoose.model('TypeParie', TypeParieSchema,'TypeParies');