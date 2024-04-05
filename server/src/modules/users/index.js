const db = require('../../db/databse');
const controller = require('./controllers/USER.controller');

module.exports = controller(db);
 