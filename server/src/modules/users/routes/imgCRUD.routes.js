const { Router } = require('express');
const { getAllImages, postImages, postImagesUser, getAllHotels, getAllUsers, postUsers, getUsers, postHoteles, getHotels, getHotelsByUser, updateHoteles, getImageUser } = require('../index');
const seguridad = require('../security');
const { logIn } = require('../../auth');




const router = Router();

//POST and update
router.post('/upload/:id_hotel', seguridad(), postImages)
router.post('/post_imguser/:id_user', seguridad(), postImagesUser)
router.post('/users', postUsers)
router.post('/login', logIn)
router.post('/hoteles', seguridad(), postHoteles)
router.patch('/hoteles/:id', seguridad(), updateHoteles)

//GET
router.get('/img_user/:id', seguridad(), getImageUser)
router.get('/images', getAllImages)
router.get('/users', seguridad(), getAllUsers)
router.get('/users/:id', seguridad(), getUsers)
router.get('/hoteles', getAllHotels)
router.get('/hoteles/:id', seguridad(), getHotels)
router.get('/hoteles/id_user/:id', seguridad(), getHotelsByUser)

//delete






module.exports = router;