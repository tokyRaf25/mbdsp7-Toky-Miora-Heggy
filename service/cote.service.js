const Cote = require('../models/cote');
async function getCoteByIdChamp( idChamp ,idParie ){
	try { 
		let idChampArgument = idChamp;
		const result = await Cote.find({ idChamp: idChampArgument,idParieSport: idParie})
		return result;
	}
	catch (e) { 
		throw e 
	}
}

module.exports = { 
	getCoteByIdChamp
}
