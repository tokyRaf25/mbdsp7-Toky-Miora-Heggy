const expressJwt = require('express-jwt');

module.exports = jwt;

function jwt() {
    const secret = 'supersecret';
    return expressJwt({ secret, algorithms: ['HS256'] }).unless({
        path: [
            // public routes that don't require authentication
            '/api/authentification',
            '/api/registration',
            '/authentification',
			'/categorie/last',
			'/api/categories',
			'/api/categorie',
			'/api/typeParies',
			'/api/champParCats',
			'/api/champParCat',
			'/api/paris',
			'/api/pari',
			'/api/typeParies',
			'/api/typeParie',
			'/api/clients',
			'/api/cote',
			'/api/resultats_reel',
			'/resultats_reel/:id',
			'/resultats_reel/pari/:id',
			
			{url: /^\/api\/categorie\/.*/,methods:['GET','PUT','POST']},
			{url: /^\/api\/categorie\/list\/.*/,methods:['GET','PUT','POST']},
			'/categorie/last',
			'/api/categorie/cote/:id/:idParie',
			'/api/cote',
			{url: /^\/cote\/.*/,methods:['GET','PUT','POST']},
			{url: /^\/cote\/pari\/.*/,methods:['GET','PUT','POST']},
			{url: /^\/api\/pari\/.*/,methods:['GET','PUT','POST']},
			{url: /^\/api\/pari\/type\/.*/,methods:['GET','PUT','POST']},
			'/api/pariOne',
			{url: /^\/api\/pariAvecCote\/.*/,methods:['GET','PUT','POST']},
			{url: /^\/api\/champParCat\/.*/,methods:['GET','PUT','POST']},
			{url: /^\/api\/champParCat\/Categorie\/.*/,methods:['GET','PUT','POST']},
			'/api/champParCat/trie',
        ]
    });
}