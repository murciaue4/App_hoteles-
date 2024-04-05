const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const respuestas = require('../../../red/respuestas');
const auth = require('../../../authentication/index');
const error = require('../../../middlewares/errors');
const nodemailer = require('nodemailer');



const T_AUTH = 'auth'
module.exports = function (dbIn) {

    let db = dbIn;
    if (!db) {
        db = require('../../../db/databse');
    }


    const insertLog = async (data) => {
        try {
            let authData = {};
            if (!data.id == 0) {
                //id
                authData.id = data.id
            }
            if (data.email) {
                //email
                authData.email = data.email;
            };
            if (data.username) {
                //username
                authData.username = data.username;
            };
            const passCrypt = await bcrypt.hash(data.password, 5)
            if (data.password) {
                //password
                authData.password = passCrypt.toString();
            };

            const result = await db.postUser(T_AUTH, authData)
            return result
        } catch (error) {
            console.log(error);
        }
    };

    const logIn = async (req, res) => {
        let result = res
        try {
            const data = await db.query(T_AUTH, req.body.username);
            console.log('controller-auth/cantidad usuarios encontrados: ', data.length);
            if (data.length <= 0) {
                throw error('user not exist !')

            } else {

                console.log('controller-auth/usuarios encontrados: ', data);
                const res = await bcrypt.compare(req.body.password, data[0].password);
                if (!res) {

                    throw error('wrong password !')

                } else {
                    const getToken = auth.asignaToken(data[0])
                    let user = {
                        id: data[0].id,
                        username: data[0].username,
                        email: data[0].email,
                        is_verify: data[0].is_verify,
                        token: getToken,
                    }
                    respuestas.sucess(req, result, user, 200)
                }
            }
        } catch (error) {

            console.log(error);

            respuestas.error(req, result, error, 500)
        };
    };
    
    const getCredential = async (req, res) => {
        result = res
        try {
            const data = await db.query(T_AUTH, req.body.username);
            respuestas.sucess(req, result, data, 200)
        } catch (error) {
            respuestas.error(req, result, error, 500)
        }
    };



    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });


    const verifyEmail = async (req, res) => {
        try {
            // Genero un token único para el usuario
            const payload = {
                userId: req.body.id,
                email: req.body.email,
            };

            // Opciones de configuración del token
            const options = {
                expiresIn: '1h', // Tiempo de expiración del token
                issuer: 'myApp' // Emisor del token 
            };
            
            // Genero el token utilizando jwt.sign()
            const token = jwt.sign(payload, process.env.JET_SECRET, options);

            // Genero un hash seguro del token
            const hashedToken = await bcrypt.hash(token, 10);

            // Envio correo electrónico de verificación
            const mailOptions = {
                from: process.env.MAIL_USER,
                to: req.body.email,
                subject: 'Verificación de Correo Electrónico',
                text: `Haz clic en el siguiente enlace para verificar tu dirección de correo electrónico: http://localhost:3333/auth/confirm-email/${token}/${payload.userId}`,
                html: `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Verificación de Correo Electrónico</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f4f4f4;
                            margin: 0;
                            padding: 0;
                        }
                        .container {
                            max-width: 600px;
                            margin: 20px auto;
                            padding: 20px;
                            background-color: #fff;
                            border-radius: 10px;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        }
                        h1 {
                            color: #333;
                            text-align: center;
                        }
                        p {
                            color: #666;
                            text-align: center;
                        }
                        .button {
                            display: block;
                            width: 200px;
                            margin: 20px auto;
                            padding: 10px 20px;
                            background-color: #007bff;
                            color: #f4f4f4 !important; /* Color blanco con !important */
                            text-align: center;
                            text-decoration: none;
                            border-radius: 5px;
                            font-weight: bold; /* Texto en negrita */
                        }
                        
                        .button:hover {
                            background-color: #0056b3;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>Verificación de Correo Electrónico</h1>
                        <p>Haz clic en el siguiente botón para verificar tu dirección de correo electrónico:</p>
                        <a class="button" href="http://localhost:3333/auth/confirm-email/${token}/${payload.userId}" target="_blank">Verificar Correo Electrónico</a>
                    </div>
                </body>
                </html>`
            };
            const sqlBody = {

                temptoken: hashedToken
            }
            const rows = await db.updateUser(T_AUTH, sqlBody, req.body.id)
            const data = await transporter.sendMail(mailOptions);
            respuestas.sucess(req, res, data, 200)

        } catch (error) {

            console.error(error);
            respuestas.error(req, res, error, 500)
        }
    };

    const confirmEmail = async (req, res) => {
        try {
            // Obtener el token de la URL
            const token = req.params.token;

            // Obtener el usuario por su ID desde la base de datos
            const userId = req.params.id;
            const [userRows] = await db.getUser(T_AUTH, userId)

            // Verifico si se encontró un usuario con el ID proporcionado
            if (userRows.length === 0) {
                return res.status(400).json({ error: 'Usuario no encontrado.' });
            }

            // Obtengo el token de verificación hasheado almacenado en la base de datos
            
            const tokenFromDatabase = userRows.temptoken;

            // Comparar el token de la URL con el token almacenado en la base de datos utilizando el mismo secreto
            const match = await bcrypt.compare(token, tokenFromDatabase);

            if (!match) {
                return res.status(400).json({ error: 'Token de verificación no válido.' });
            }

            // Marco el correo electrónico como verificado y elimino el token de verificación
            const sqlBody = {
                is_verify: '1',
                temptoken: null,

            };
            const rows = await db.updateUser(T_AUTH, sqlBody, userId) 

            // Respondo con un mensaje de éxito
            res.redirect('http://localhost:5173/login');

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al verificar el correo electrónico.' });
        }
    };
    return {

        insertLog,
        logIn,
        getCredential,
        verifyEmail,
        confirmEmail
    }
};



