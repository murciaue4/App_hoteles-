const authentication = require('../../authentication/index');
module.exports = function tokenSChecker (){
    function middleware (req, res, next){
       authentication.checkearToken.confirmarToken(req);
        next()
    }
    return middleware; 
};  