const bcrypt = require('bcrypt')
const respuestas = require('../../../red/respuestas');
const auth = require('../../../authentication/index');
const { token } = require('morgan');
const error = require('../../../middlewares/errors');


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

                console.log('controller-auth/usuarios encontrados: ',data);
                const res = await bcrypt.compare(req.body.password, data[0].password);
                if (!res) {

                    throw error('wrong password !')

                } else {
                    const getToken = auth.asignaToken(data[0])
                    let user = {
                        id: data[0].id,
                        username: data[0].username,
                        token: getToken,
                    }
                    respuestas.sucess(req, result, user, 200)
                }
            }
        } catch (error) {

            console.log(error);

            respuestas.error(req, result, error, 500)
        };
    }
    const getCredential = async (req, res) => {
        result = res
        try {
            const data = await db.query(T_AUTH, req.body.username);
            respuestas.sucess(req, result, data,200)
        } catch (error) {
            respuestas.error(req, result, error,500)
        }
    }
    return {

        insertLog,
        logIn,
        getCredential
    }
};



