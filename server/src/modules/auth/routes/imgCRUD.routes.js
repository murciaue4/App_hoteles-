const { Router } = require('express');
const { insertLog, logIn} = require('../index');





const router = Router();




router.post('/login', logIn) 






module.exports = router;