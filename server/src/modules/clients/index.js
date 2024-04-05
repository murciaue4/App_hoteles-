const db = require('../../db/databse');
const controller = require('./controllers/CLIENTS.controller');

module.exports = controller(db);
 