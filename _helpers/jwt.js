const expressJwt = require('express-jwt');

module.exports = jwt;

function jwt() {
    const secret = 'supersecret';
    return expressJwt({ secret, algorithms: ['HS256'] }).unless({
        path: [
            // public routes that don't require authentication
            '/api/authentification'
        ]
    });
}