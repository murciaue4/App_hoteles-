const error = require('../../../middlewares/errors');
const respuestas = require('../../../red/respuestas');
const auth = require('../../auth');


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


    //_______________POST________________________________________


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

            const result1 = await db.postHotel(T_HOTEL, hotel);
            console.log('controller-user/ Result of postHotel:', result1);

            respuestas.sucess(req, res, result1, 200)

        } catch (error) {

            respuestas.error(req, res, error, error.statusCode)

        }
    };
    const postUsers = async (req, res) => {

        try {
            const body = req.body;
           let userTypeOf = ((body.usertype === 'propietario') && true) || false;
            const isUsername = await db.query(T_AUTH, body.username);
            const query = await db.allUsers(T_USERS);
            console.log('isUsername: ', isUsername);
            const createdUsers = query.map(el => ({ id: el.id, email: el.email }));
            const emails = createdUsers.map(el => el.email);
            const [findByEmail] = createdUsers.filter(el => el.email == body.email);
            const isDuplicateEmail = emails.includes(body.email)
            const isId = createdUsers.map(el => el.id).includes(body.id);
            console.log('findByEmail:', findByEmail);
            let result2;
            let insertIdConsulta1;

            let user = {

                name: body.name,
                lastname: body.lastname,
                email: body.email,
                usertype: userTypeOf
            };
            if (isId && body.id == findByEmail.id) {
                user['id'] = body.id
            };

            if (isUsername.length > 0) {

                console.log('isUsername: ', isUsername);
                throw error('username ya usado/////', 401)
            }
            if (isDuplicateEmail) {
                if (body.id == 0) {
                    console.log('user: ', user);
                    throw error('email ya usado/////', 401)
                }
                if (isId && body.id == findByEmail.id) {
                    user['id'] = findByEmail.id

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

    // *****************UPDATE**************************************

    const updateHoteles = async (req, res) => {

        try {
            const body = req.body;
            console.log('BODY on controllers: ', req.body);
            const id = req.params.id


            const result = await db.updateHotel(T_HOTEL, body, id);
            console.log('controller-user/ Result of postHotel:', result);

            respuestas.sucess(req, res, result, 200)

        } catch (error) {

            respuestas.error(req, res, error, error.estatusCode)

        }
    };
    //------------------GET--------------------------------------


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

            let images = [];
            let data;
            for (let i = 0; i < hoteles.length; i++) {
                images = await db.getImagesById(T_IMAGE, hoteles[i].id)
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
            const id = req.params.id
            console.log(id);
            const hoteles = await db.getHotelByUser(T_HOTEL, id);

            let images = [];
            let data;
            for (let i = 0; i < hoteles.length; i++) {
                images = await db.getImagesById(T_IMAGE, id)
                data = [...hoteles]
                data[i].img = images
            };
           
            console.log('getHotelsByUser: ', data);
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
    return {
        postImages,
        getAllImages,
        getAllHotels,
        getAllUsers,
        postHoteles,
        postUsers,
        getUsers,
        getHotels,
        getHotelsByUser,
        updateHoteles

    }
};



