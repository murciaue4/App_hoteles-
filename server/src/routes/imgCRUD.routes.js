const { Router } = require('express');
const { getRenderEjs, getAllImages, postImages, getAllHotels, getAllUsers } = require('../controllers/imgCRUD.controller');


const router = Router();

router.get('/', getRenderEjs);
router.post('/upload', postImages)
router.get('/images', getAllImages)
router.get('/hoteles', getAllHotels)
router.get('/users', getAllUsers)



module.exports = router;