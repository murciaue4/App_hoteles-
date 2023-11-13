const { Router } = require('express');
const { getAllImages, postImages, getAllHotels, getAllUsers, postUsers, getUsers } = require('../index');
const seguridad = require('../security');
const { logIn } = require('../../auth');




const router = Router();


router.post('/upload', seguridad(), postImages)
router.get('/images', seguridad(), getAllImages)
router.get('/hoteles', seguridad(),getAllHotels)
router.get('/users', seguridad(),getAllUsers)
router.get('/users/:id', seguridad(),getUsers)
router.post('/users', seguridad(), postUsers)
router.post('/login', logIn)






module.exports = router;