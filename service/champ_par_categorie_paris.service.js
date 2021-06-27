const Champ = require('../models/champ_par_categorie_pari');
async function getChampByIdCategorie( idCategorie ){
	try { 
		let categorieId = idCategorie;
		const result = await Champ.find({ idCategorie: categorieId })
		return result;
	}
	catch (e) { 
		throw e 
	}
}
module.exports = { 
	getChampByIdCategorie
}