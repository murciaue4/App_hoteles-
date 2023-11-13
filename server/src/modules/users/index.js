const db = require('../../db/databse');
const controller = require('./controllers/imgCRUD.controller');

module.exports = controller(db);
 