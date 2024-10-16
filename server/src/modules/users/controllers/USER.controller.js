const error = require('../../../middlewares/errors');
const respuestas = require('../../../red/respuestas');
const auth = require('../../auth');

const T_COMMENTS = 'comments';
const T_RATE = 'ratings';
const T_USERS = 'user';
const T_HOTEL = 'hoteles';
const T_IMAGE = 'images';
const T_IMGUS = 'images_user';
const T_AUTH = 'auth';


module.exports = function (dbIn) {

    let db = dbIn;
    if (!db) {
        db = require('../../../db/databse');
    }


    //____________________________________POST________________________________________

    const postComments = async (req, res) => {
        try {
            const comment = {
                id_user: req.params.id_user,
                user: req.body.user,
                id_hotel: req.params.id_hotel,
                comment_text: req.body.comment_text,
            };

            const existingComments = await db.getCommentUser(T_COMMENTS, req.params.id_user);

            const existingComment = existingComments.find(comment => comment.id_hotel == req.params.id_hotel);

            if (existingComment) {
                comment.id = existingComment.id;
            };

            const DBresponse = await db.postComment(T_COMMENTS, comment);
            console.log('controller-user/ POST_COMMENT:', DBresponse);

            respuestas.sucess(req, res, DBresponse, 200);
        } catch (error) {
            respuestas.error(req, res, error, error.statusCode);
        }
    };
    const postRatings = async (req, res) => {
        try {
            const rate = {
                id_user: req.params.id_user,
                user: req.body.user,
                id_hotel: req.params.id_hotel,
                rating_value: req.body.rating_value,
            };

            const existingRatings = await db.getRatingUser(T_RATE, req.params.id_user);
            const existingRating = existingRatings.find(rating => rating.id_hotel == req.params.id_hotel);

            if (existingRating) {
                rate.id = existingRating.id;
            };

            const DBresponse = await db.postRate(T_RATE, rate);
            console.log('controller-user/ POST_RATE:', DBresponse);

            respuestas.sucess(req, res, DBresponse, 200);
        } catch (error) {
            respuestas.error(req, res, error, error.statusCode);
        }
    };

    const postHoteles = async (req, res) => {

        try {
            const body = req.body;
            const consulta = await db.getHotels(T_HOTEL);
            const hoteles = consulta.map(el => ({ id: el.id, name: el.name }));
            const isDuplicateId = hoteles.map(el => el.id).includes(body.id);
            const isDuplicateName = hoteles.map(el => el.name).includes(body.name)
            const [findDuplicated] = hoteles.filter(el => el.email == body.email);

            const hotel = { ...body };

            if (isDuplicateName) {
                if (body.id == 0) {
                    throw error('Ya existe un HOTEL con este nombre', 401)
                }
                if (isDuplicateId && body.id == findDuplicated.id) {
                    hotel['id'] = body.id
                }
            };

            if (isDuplicateId && body.id == findDuplicated.id) {
                hotel.id = body.id
            };

            const DBresponse = await db.postHotel(T_HOTEL, hotel);
            console.log('controller-user/ Result of postHotel:', DBresponse);

            respuestas.sucess(req, res, DBresponse, 200)

        } catch (error) {

            respuestas.error(req, res, error, error.statusCode)

        }
    };
    const postUsers = async (req, res) => {
        const validarContraseña = (contraseña) => {
            // Verificar longitud mínima y máxima
            const longitudValida = contraseña.length >= 8 && contraseña.length <= 11;

            // Verificar si la contraseña tiene al menos un número
            const tieneNumero = /[0-9]/.test(contraseña);

            // Verificar si la contraseña tiene al menos una letra en mayúscula
            const tieneMayuscula = /[A-Z]/.test(contraseña);

            // Devolver true si la contraseña cumple con todos los criterios, false de lo contrario
            return longitudValida && tieneNumero && tieneMayuscula;
        }

        try {
            if (!validarContraseña(req.body.password)) {
                throw error('La contraseña debe contar con al menos 8 caracteres, una mayuscula y un numero.', 401)
            }
            const body = req.body;
            const isUsername = await db.query(T_AUTH, body.username);
            const query = await db.allUsers(T_USERS);
            const createdUsers = query.map(el => ({ id: el.id, email: el.email.toLowerCase() }));
            const emails = createdUsers.map(el => el.email.toLowerCase());
            console.log('CLG: ', emails);
            const [findByEmail] = createdUsers.filter(el => el.email.toLowerCase() == body.email.toLowerCase());
            const isDuplicateEmail = emails.includes(body.email)
            const isId = createdUsers.map(el => el.id).includes(body.id);
            console.log('findByEmail:', findByEmail || 'NO');
            let result2;
            let insertIdConsulta1;

            let user = {

                name: body.name,
                lastname: body.lastname,
                email: body.email,
                usertype: body.usertype
            };



            //si existe el usuario....
            if (isUsername.length > 0) {

                console.log('isUsername: ', isUsername);
                throw error('username ya usado/////', 401)
            }
            //si el id ya existe y ademas es igual al id relacionado al correo existente...
            if (isId && body.id == findByEmail.id) {
                user['id'] = body.id
            };

            if (isDuplicateEmail) {
                //si el email ya existe y el id es 0(o sea que es un registro nuevo)...
                if (body.id == 0) {
                    console.log('user: ', user);
                    throw error('email ya usado/////', 401)
                }

                //si el email ya existe y el id es igual al id relacionado al correo existente...
                if (isId && body.id == findByEmail.id) {
                    user['id'] = body.id

                }
            };



            const result1 = await db.postUser(T_USERS, user);

            console.log('primera consulta:', result1);
            insertIdConsulta1 = result1[0].insertId;
            if (insertIdConsulta1 == 0) {
                insertIdConsulta1 = user.id
            };

            if (body.username && body.password) {
                result2 = await auth.insertLog({

                    id: insertIdConsulta1,
                    email: body.email,
                    username: body.username,
                    password: body.password
                });


            };
            respuestas.sucess(req, res, [...result1, ...result2], 200)

        } catch (error) {

            respuestas.error(req, res, error, error.estatusCode)

        }
    };
    const postImages = async (req, res) => {

        try {
            console.log('CONTROLLER USER/ REQ.FILEs: ', req.files);
            let idHotel = null;
            let idUser = null;
            if (req.params.id_hotel) {
                idHotel = req.params.id_hotel
            }
            if (req.params.user) {
                idUser = req.params.id_user
            }

            const result = await db.postImage(T_IMAGE, req, idHotel, idUser)
            res.status(200).json(result)


        } catch (error) {
            console.log(error);
            if (error.errno === 1062) {
                res.status(300).render('index')
            } else {

                res.status(500).send('Something went wrong while uploading data');
            }
        }
    };
    const postImagesUser = async (req, res) => {

        try {

            let idUser = req.params.id_user


            const result = await db.postImgUser(T_IMGUS, req, idUser)
            res.status(200).json(result)


        } catch (error) {
            console.log(error);
            if (error.errno === 1062) {
                res.status(300).render('index')
            } else {

                res.status(500).send('Something went wrong while uploading data');
            }
        }
    };



    //_____________________________________GET_____________________________________


    const getRatingsUser = async (req, res) => {
        const id = req.params.id_user
        try {
            const rows = await db.getRatingUser(T_RATE, id);

            respuestas.sucess(req, res, rows, 200)
        } catch (error) {
            console.log(error);

            respuestas.error(req, res, error, 500)
        }
    };
    const getCommentsUser = async (req, res) => {
        const id = req.params.id_user
        try {
            const rows = await db.getCommentUser(T_COMMENTS, id);

            respuestas.sucess(req, res, rows, 200)
        } catch (error) {
            console.log(error);

            respuestas.error(req, res, error, 500)
        }
    };
    const getRatingsHotel = async (req, res) => {
        const id = req.params.id_hotel;
        try {
            const rows = await db.getRatingHotel(T_RATE, id);

            respuestas.sucess(req, res, rows, 200)
        } catch (error) {
            console.log(error);

            respuestas.error(req, res, error, 500)
        }
    };
    const getCommentsHotel = async (req, res) => {
        const id = req.params.id_hotel
        try {
            const rows = await db.getCommentHotel(T_COMMENTS, id);

            respuestas.sucess(req, res, rows, 200)
        } catch (error) {
            console.log(error);

            respuestas.error(req, res, error, 500)
        }
    };
    const getImageUser = async (req, res) => {
        try {
            const rows = await db.getUserImg(T_IMGUS, req.params.id);
            const data = rows
            respuestas.sucess(req, res, data, 200)
        } catch (error) {
            console.log(error);

            respuestas.error(req, res, error, 500)
        }
    };
    const getAllImages = async (req, res) => {
        try {
            const rows = await db.getImages(T_IMAGE);
            const data = rows.map(el => el.name)
            respuestas.sucess(req, res, data, 200)
        } catch (error) {
            console.log(error);
            respuestas.error(req, res, error, 500) 
        }
    };
    const getAllHotels = async (req, res) => {
        try {
            const hoteles = await db.getHotels(T_HOTEL);
            let data = [];

            for (let i = 0; i < hoteles.length; i++) {
                const images = await db.getImagesById(T_IMAGE, hoteles[i].id);
                const rating = await db.getRatingHotel(T_RATE, hoteles[i].id);

                const arrayRatings = rating.map(el => el.rating_value);
                const suma = arrayRatings.reduce((acc, curr) => acc + curr, 0);
                const promedio = rating.length > 0 ? suma / rating.length : 0;

                data.push({
                    ...hoteles[i],
                    img: images,
                    rating: {
                        promedio,
                        totalRates: rating.length,
                    }
                });
            };
            
            res.json(data);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Something went wrong', error });
        }
    };
    const getHotels = async (req, res) => {
        try {
            const id = req.params.id
            const hoteles = await db.getHotel(T_HOTEL, id);

            let images = [];
            let data;
            for (let i = 0; i < hoteles.length; i++) {
                images = await db.getImagesById(T_IMAGE, id)
                data = [...hoteles]
                data[i].img = images
            };
            console.log(data);
            res.json(data)
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'somethings goes wrong', error })
        }
    };
    const getHotelsByUser = async (req, res) => {
        try {
            const id = req.params.id;
            const hoteles = await db.getHotelByUser(T_HOTEL, id);

            let images = [];
            let data;
            for (let i = 0; i < hoteles.length; i++) {
                data = [...hoteles]
                let idHotel = data[i].id
                images = await db.getImagesById(T_IMAGE, idHotel)
                data[i].img = images
            };
            respuestas.sucess(req, res, data, 200)
        } catch (error) {
            console.log(error);
            respuestas.error(req, res, data, 401)
        }
    };
    const getAllUsers = async (req, res) => {
        try {
            const rows = await db.allUsers(T_USERS);
            respuestas.sucess(req, res, rows, 200)
        } catch (error) {
            respuestas.error(res, 'err', 500)
        }
    };
    const getUsers = async (req, res) => {

        try {
            const rows = await db.getUser(T_USERS, req.params.id)
            respuestas.sucess(req, res, rows, 200)
        } catch (error) {
            //respuestas.error(req, res, error, 500)
        }
    };



    // __________________________________UPDATE__________________________________


    const updateHoteles = async (req, res) => {

        try {
            const body = req.body;
            console.log('BODY on controllers: ', req.body);
            const id_hotel = req.params.id_hotel


            const result = await db.updateHotel(T_HOTEL, body, id_hotel);
            console.log('controller-user/ Result of postHotel:', result);

            respuestas.sucess(req, res, result, 200)

        } catch (error) {

            respuestas.error(req, res, error, error.estatusCode)

        }
    };




    //___________________________________DELETE__________________________________


    const deleteRatingsHotel = async (req, res) => {
        //tengo que buscar el id del coemntario y si ese comentario tienen el id del usuario en cuestion si puede eliminar de lo contario no
        try {
            const id = req.params.id_user;
            const result = await db.deleteRating(T_RATE, id);
            respuestas.sucess(req, res, result, 200)
        } catch (err) {
            respuestas.error(req, res, result, err.statusCode)
        }
    };

    return {
        getAllImages,
        getAllHotels,
        getAllUsers,
        getUsers,
        getHotelsByUser,
        getHotels,
        postImages,
        postImagesUser,
        postHoteles,
        postUsers,
        updateHoteles,
        getImageUser,
        postRatings,
        postComments,
        getRatingsUser,
        getRatingsHotel,
        getCommentsUser,
        getCommentsHotel,
        deleteRatingsHotel

    }
};



