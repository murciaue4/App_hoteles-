const authentication = require('../../authentication/index');
module.exports = function tokenSChecker (){
    function middleware (req, res, next){
        const id =  req.body.id;
        authentication.checkearToken.confirmarToken(req);
        next()
    }
    return middleware; 
};