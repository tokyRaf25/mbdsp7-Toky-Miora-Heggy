var mongoose = require('mongoose');
var AdministrateurSchema = new mongoose.Schema({
    login: String,
    password: String
});
mongoose.model('Administrateur', AdministrateurSchema);

module.exports = mongoose.model('Administrateur');
