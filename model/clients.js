var mongoose = require('mongoose');
var ClientSchema = new mongoose.Schema({
    name: String,
    email: String,
    jetons: Number,
    password: String
});
mongoose.model('Clients', ClientSchema);

module.exports = mongoose.model('Clients');
