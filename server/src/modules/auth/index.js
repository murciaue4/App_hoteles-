const db = require('../../db/databse');
const controller = require('./controllers/AUTH.controller');

module.exports = controller(db);
 