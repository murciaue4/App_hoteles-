 const { Router } = require('express');
const { getRenderEjs, getAllImages, postImages, getAllHotels, getAllUsers, postUsers, dropUsers, getUsers } = require('../index');



const router = Router();

router.get('/', getRenderEjs);
router.post('/upload', postImages)
router.get('/images', getAllImages)
router.get('/hoteles', getAllHotels)
router.get('/users', getAllUsers)
router.post('/users', postUsers)
router.delete('/users', dropUsers)
router.get('/users/:id',getUsers)






module.exports = router;