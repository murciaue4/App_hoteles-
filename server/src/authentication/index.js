const jwt = require('jsonwebtoken');
config = require('../config');
const error = require('../middlewares/errors');



let secret = config.jwt.secret;

function asignaToken(data) {
    return jwt.sign(data, secret)

};

function verificarToken(data) {
    return jwt.verify(data, secret)
};

function optenerToken(authorization) {
    if (!authorization) {
        throw error('Header authorization not exist', 401)
    }
    if (authorization.indexOf('Bearer') === -1) {
        throw error('Invalid format of token', 401)
    }
    let token = authorization.replace('Bearer ', '');
    return token;
};

function decodificarCabecera(req) {
    const permiso = req.headers.authorization;
    const token = optenerToken(permiso);
    const verificado = verificarToken(token);
    console.log('authentication/user verificado', verificado);
    req.user = verificado;
    return verificado;
};

const checkearToken = {
    confirmarToken: function (req) {
        const decodificado = decodificarCabecera(req);
        console.log('authentication/user decodificado: ', decodificado);

        if (!decodificado) {
            throw error('Not authorized', 401)
        }
    }
};



module.exports = {
    asignaToken,
    checkearToken
};