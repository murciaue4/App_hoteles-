const { Router } = require('express');
const { insertLog, logIn , getCredential} = require('../index');

const router = Router();

router.post('/login', logIn)
router.get('/', getCredential)


module.exports = router;