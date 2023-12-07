const db = require('../../db/databse');
const controller = require('./controllers/CRUD.controller');

module.exports = controller(db);
 