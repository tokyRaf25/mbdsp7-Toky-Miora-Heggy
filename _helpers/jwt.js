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
			'/api/categorie',
			'/api/point_de_vente',
			{url: /^\/api\/point_de_vente\/.*/,methods:['GET','PUT','POST','DELETE']},
			{url: /^\/api\/clients\/.*/,methods:['GET','PUT','POST','DELETE']},
			'/api/categorie',
			'/api/typeParies',
			'/api/champParCat',
			'/api/pari',
			'/api/typeParie',
			'/api/clients',
			'/api/cote',
			'/api/resultats_reel',
			'/api/resultats_predit',
			'/resultats_reel/:id',
			{url: /^\/resultats_reel\/.*\/.*/,methods:['GET','PUT','POST','DELETE']},
			{url: /^\/resultats_reel\/pari\/.*/,methods:['GET','PUT','POST','DELETE']},
			{url: /^\/api\/categorie\/.*/,methods:['GET','PUT','POST','DELETE']},
			{url: /^\/api\/categorie\/list\/.*/,methods:['GET','PUT','POST','DELETE']},

			{url: /^\/api\/point_de_vente\/.*/,methods:['GET','PUT','POST','DELETE']},
			{url: /^\/api\/typeParie\/.*/,methods:['GET','PUT','POST','DELETE']},
			{url: /^\/api\/pariValide\/.*/,methods:['GET','PUT','POST','DELETE']},
			{url: /^\/api\/pariOne\/.*/,methods:['GET','PUT','POST','DELETE']},
			{url: /^\/api\/pariAvecCote\/.*/,methods:['GET','PUT','POST','DELETE']},
			{url: /^\/api\/resultats_predit\/.*/,methods:['GET','PUT','POST','DELETE']},
			{url: /^\/api\/resultats_predit\/.*/,methods:['GET','PUT','POST','DELETE']},
			{url: /^\/api\/resultats_predit\/user_termine\/.*/,methods:['GET','PUT','POST','DELETE']},
			{url: /^\/api\/resultats_predit\/user_en_cours\/.*/,methods:['GET','PUT','POST','DELETE']},
			{url: /^\/api\/resultats_predit\/pariSport\/.*/,methods:['GET','PUT','POST','DELETE']},
			{url: /^\/api\/pari\/type\/.*/,methods:['GET','PUT','POST','DELETE']},
			{url: /^\/api\/client\/.*/,methods:['GET','PUT','POST','DELETE']},

			'/categorie/last',
			'/api/categorie/cote/:id/:idParie',
			'/api/cote',
			{url: /^\/cote\/.*/,methods:['GET','PUT','POST','DELETE']},
			{url: /^\/cote\/pari\/.*/,methods:['GET','PUT','POST','DELETE']},
			{url: /^\/cote\/champ\/.*/,methods:['GET','PUT','POST','DELETE']},
			{url: /^\/api\/pari\/.*/,methods:['GET','PUT','POST','DELETE']},
			{url: /^\/api\/pari\/type\/.*/,methods:['GET','PUT','POST','DELETE']},
			'/api/pariOne',
			{url: /^\/api\/pariAvecCote\/.*/,methods:['GET','PUT','POST','DELETE']},
			{url: /^\/api\/champParCat\/.*/,methods:['GET','PUT','POST','DELETE']},
			{url: /^\/api\/champParCat\/Categorie\/.*/,methods:['GET','PUT','POST','DELETE']},
			'/api/champParCat/trie',
            '/api/categorie',
            {url: /^\/api\/categorie\/.*/, methods: ['GET', 'PUT', 'POST']}
        ]
    });
}