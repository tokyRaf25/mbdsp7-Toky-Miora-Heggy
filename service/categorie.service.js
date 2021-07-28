const Categorie = require('../models/Categorie');
async function getCategorie( idTypePari1 ){
	try { 
		const result = await Categorie.find({ idTypePari: idTypePari1 })
		return result;
	}
	catch (e) { 
		throw e 
	}
}
module.exports = { 
	getCategorie
}