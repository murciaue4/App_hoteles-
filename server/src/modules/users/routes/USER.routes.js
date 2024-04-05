const { Router } = require('express');
const { getAllImages, postImages, postImagesUser, getAllHotels, getAllUsers, postUsers, getUsers, postHoteles, getHotels, getHotelsByUser, updateHoteles, getImageUser, postComments, postRatings, getCommentsHotel, getCommentsUser, getRatingsUser, getRatingsHotel, deleteRatingsHotel } = require('../index');
const seguridad = require('../security');
const { logIn } = require('../../auth'); 




const router = Router();

//__________________________POST__________________________
router.post('/upload/:id_hotel/:id_user', seguridad(), postImages)
router.post('/post_imguser/:id_user', seguridad(), postImagesUser)
router.post('/users', postUsers)
router.post('/login', logIn)
router.post('/hoteles/:id_user', seguridad(), postHoteles)

router.post('/hoteles/:id_hotel/comments/:id_user', seguridad(), postComments)
router.post('/hoteles/:id_hotel/ratings/:id_user', seguridad(), postRatings)



//___________________________GET___________________________

router.get('/hoteles',getAllHotels)
router.get('/hoteles/:id', seguridad(), getHotels)
router.get('/hoteles/id_user/:id', seguridad(), getHotelsByUser)
//users
router.get('/users', seguridad(), getAllUsers)
router.get('/users/:id', seguridad(), getUsers)
//images
router.get('/img_user/:id', seguridad(), getImageUser)
router.get('/images', getAllImages)
//comments and rating
router.get('/:id_user/ratings', seguridad(), getRatingsUser)
router.get('/hoteles/:id_hotel/ratings', getRatingsHotel)
router.get('/:id_user/comments', seguridad(), getCommentsUser)
router.get('/hoteles/:id_hotel/comments', getCommentsHotel)

//____________________________UPDATE____________________________

router.patch('/hoteles/:id_hotel/:id_user', seguridad(), updateHoteles)


//_____________________________DELETE________________________________


router.delete('/hoteles/:id_user/ratings',seguridad(), deleteRatingsHotel)
// router.delete('/hoteles/:id_user/comments',seguridad(), deleteCommentsHotel)



module.exports = router;