const respuestas = require('../../../red/respuestas');
const auth = require('../../auth');

const T_USERS = 'user';
const T_HOTEL = 'hoteles';
const T_IMAGE = 'images'
const T_IMGUS = 'images_user'


module.exports = function (dbIn) {

    let db = dbIn;
    if (!db) {
        db = require('../../../db/databse');
    }
 

 
    const getRenderEjs = (req, res) => {
        res.render('index')
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
             respuestas.error(res, error, 500)
        }
    };
    const postUsers = async (req, res) => {

        try {
            const body = req.body;
            console.log(body.id);
            const query = await db.allUsers(T_USERS);
            const createdUsers = query.map(el => ({ id: el.id, email: el.email }));
            const emails = createdUsers.map(el => el.email);
            const isDuplicate = emails.includes(body.email)
            console.log('isDuplicate: ', isDuplicate);
            const [findByEmail] = createdUsers.filter(el => el.email == body.email);
            const isId = createdUsers.map(el => el.id).includes(body.id);
            let result2;
            let idConsulta2;

            let user = {
                name: body.name,
                email: body.email,
                usertype: body.usertype
            };

            if (isDuplicate) {
                console.log(findByEmail.id);
                console.log(isId);
                if (body.id == 0) {
                    throw error('email ya usado/////', 401)
                }
                if (isId && body.id == findByEmail.id) {
                    console.log(('eurecaaaaaaaa!!!!!!'));
                    user['id'] = body.id
                    console.log(user);
                }
            };

            if (isId && body.id == findByEmail.id) {
                console.log(('eureca***************!!!!!!'));
                user['id'] = body.id
                console.log(user);
            };

            const result1 = await db.postUser(T_USERS, user);
            console.log(result1);
            idConsulta2 = result1[0].insertId;
            if (result1[0].insertId == 0) {
                idConsulta2 = user.id
            };

            if (body.username && body.password) {
                result2 = await auth.insertLog({

                    id: idConsulta2,
                    username: body.username,
                    password: body.password
                });

            };

            await respuestas.sucess(req, res, [...result1, ...result2], 200)

        } catch (error) {

            respuestas.error(req, res, error, error.estatusCode)

        }
    };
    const dropUsers = async (req, res) => {
        try {

            const result = await db.dropUser(T_USERS, req)
            respuestas.sucess(req, res, result, 200)
        } catch (error) {

            respuestas.error(req, res, error, 500)

        }
    };
    const postImages = async (req, res) => {
        try {
            const result = await db.postImage(T_IMGUS, req)
            res.status(200).render('uploaded')


        } catch (error) {
            console.log(error);
            if (error.errno === 1062) {
                res.status(300).render('index')
            } else {

                res.status(500).send('Something went wrong while uploading data');
            }
        }
    };
    const getAllImages = async (req, res) => {
        try {
            const rows = await db.getImages(T_IMAGE)
            respuestas.sucess(req, res, rows, 200)
        } catch (error) {
            console.log(error);
            respuestas.error(req, res, error, 500)
        }
    };
    const getAllHotels = async (req, res) => {
        try {
            const rows = await db.getHotels(T_HOTEL);
            res.json(rows)
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'somethings goes wrong', error })
        }
    };
    return {
        postImages,
        getAllImages,
        getRenderEjs,
        getAllHotels,
        getAllUsers,
        postUsers,
        dropUsers,
        getUsers
    }
};



