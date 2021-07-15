let mongoose = require('mongoose');
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let Schema = mongoose.Schema;

let ResultatReelSchema = Schema({
    idPariSport: String,
    idChamp: String
});

ResultatReelSchema.plugin(aggregatePaginate);

module.exports = mongoose.model('ResultatReel',ResultatReelSchema,'resultatReel');
