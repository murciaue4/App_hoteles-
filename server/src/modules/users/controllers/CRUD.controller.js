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
    const handleError = (message, statusCode, req, res) => {
        const error = new Error(message);
        error.statusCode = statusCode;
        throw error;
    };

    //_______________POST________________________________________


    const postHoteles = async (req, res) => {
        try {
            const { id, name, email, ...rest } = req.body;
    
            // Obtener lista de hoteles existentes
            const hoteles = await obtenerHotelesExistentes();
    
            // Validar duplicados de nombre e id
            const isDuplicateName = hoteles.some(hotel => hotel.name === name);
            const isDuplicateId = hoteles.some(hotel => hotel.id === id);
            const hotelDuplicado = hoteles.find(hotel => hotel.email === email);
    
            // Construir objeto hotel
            const hotel = { id, name, email, ...rest };
    
            // Verificar si el nombre del hotel ya existe
            if (isDuplicateName && id === 0) {
                return handleError('Ya existe un HOTEL con este nombre', 401, req, res);
            }
    
            // Si el hotel ya existe y tiene el mismo id, actualizar su id
            if (isDuplicateId && hotelDuplicado && id === hotelDuplicado.id) {
                hotel.id = id;
            }
    
            // Insertar o actualizar hotel
            const result = await db.postHotel(T_HOTEL, hotel);
            console.log('controller-user/ Resultado de postHotel:', result);
    
            // Responder con éxito
            return respuestas.sucess(req, res, result, 200);
    
        } catch (error) {
            return respuestas.error(req, res, error, error.statusCode || 500);
        }
    };
    
    // Función para obtener la lista de hoteles existentes
    const obtenerHotelesExistentes = async () => {
        const consulta = await db.getHotels(T_HOTEL);
        return consulta.map(hotel => ({
            id: hotel.id,
            name: hotel.name,
            email: hotel.email
        }));

    };
    
    // Función para manejar errores
   
    const postUsers = async (req, res) => {
        try {
            const { name, lastname, email, usertype, id, username, password } = req.body;
    
            // Definir el tipo de usuario
            const isPropietario = usertype === 'propietario';
    
            // Verificar si el username ya existe
            const isUsernameExists = await db.query(T_AUTH, username);
            if (isUsernameExists.length > 0) {
                return handleError('El nombre de usuario ya está en uso.', 401, req, res);
            }
    
            // Obtener todos los usuarios existentes
            const users = await db.allUsers(T_USERS);
            const existingEmails = users.map(user => user.email);
            const existingIds = users.map(user => user.id);
    
            // Verificar si el correo electrónico ya existe
            if (existingEmails.includes(email)) {
                if (id === 0) {
                    return handleError('El correo electrónico ya está en uso.', 401, req, res);
                }
            }
    
            // Construir objeto usuario
            const user = {
                name,
                lastname,
                email,
                usertype: isPropietario
            };
    
            // Actualizar usuario existente si el id es válido
            if (existingIds.includes(id)) {
                user['id'] = id;
            }
    
            // Insertar el usuario en la base de datos
            const result1 = await db.postUser(T_USERS, user);
            let userId = result1[0]?.insertId || id;
    
            // Si se proporcionan credenciales, insertar en la tabla de autenticación
            let result2 = [];
            if (username && password) {
                result2 = await auth.insertLog({
                    id: userId,
                    email,
                    username,
                    password
                });
            }
    
            // Respuesta exitosa
            return respuestas.sucess(req, res, [...result1, ...result2], 200);
    
        } catch (error) {
            return respuestas.error(req, res, error, error.statusCode || 500);
        }
    };
    
    // Función para manejar errores y mejorar la consistencia
    
    
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
            const res = await db.getImages(T_IMAGE);
            const data = res.map(el => el.name)
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



