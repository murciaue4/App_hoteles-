const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const dbConfig = require('../config');


const pool = mysql.createPool(dbConfig.db);


const allUsers = async (tabla) => {
    const [rows] = await pool.query(`SELECT * FROM ${tabla};`)
    return rows;
};
const getUser = async (tabla, id) => {
    const [rows] = await pool.query(`SELECT * FROM ${tabla} WHERE id = ?;`, [id])
    return rows;
};

const postUser = async (tabla, body) => {
    const result = await pool.query(`INSERT INTO ${tabla} SET ? ON DUPLICATE KEY UPDATE ?;`, [body, body]);
    return result;
};


const getImages = async (tabla) => {
    const [rows] = await pool.query(`SELECT * FROM ${tabla};`)
    await rows.map(el => {
        fs.writeFileSync(path.join(__dirname, '../static/' + el.name), el.data)
    })
    return await rows.map(el => el)
};

const postImage = async (tabla, req) => {
    //extraigo los parametros de el archivo que se encuentra en el objeto file de la reqest y de la base de datos.
    const name = req.file.filename;
    const data = fs.readFileSync(path.join(__dirname, '../public/uploads', req.file.filename));
    const type = req.file.mimetype;
    const originalName = req.file.originalname;
    const dataBody = {

        name,
        data,
        type,
        originalName,
    }
    const [rows] = await pool.query(`SELECT originalname FROM ${tabla};`);
    //si es primer dato lo insertamos en la base de datos y si no entonces filtramos que no este duplicado filtramos por nombre original, PDTE******* DEBO FILTRAR POR data SI ES POSIBLE*****
    if (rows.length === 0) {
        const result = await pool.query(`INSERT INTO ${tabla} SET ? ON DUPLICATE KEY UPDATE ?;`, [dataBody, dataBody]);
        return result;
    }

    const existNames = rows.map((el) => el.originalname);
    if (!existNames.includes(originalName)) {
        const result = await pool.query(`INSERT INTO ${tabla} SET ? ON DUPLICATE KEY UPDATE ?;`, [dataBody, dataBody]);
        console.log(result);
        return result;

    } else {
        const result = await pool.query(`INSERT INTO ${tabla} SET ? ON DUPLICATE KEY UPDATE ?;`, [dataBody, dataBody]);
        return result;
    }
};

const getHotels = async (tabla) => {
    const [rows] = await pool.query(`SELECT * FROM ${tabla};`);
    return rows
};
const query = async (tabla, data) => {
    const [rows] = await pool.query(`SELECT * FROM ${tabla} WHERE username = ? ;`, [data]);
    return rows;
};
const getImagesById = async (tabla, HotelId) => {
    const [images] = await pool.query(`SELECT * FROM ${tabla} WHERE id_hotel = ${HotelId}`)
    const data = images.map((el) => dbConfig.urlStatic.urlstatic + el.name)
    return data
}
module.exports = { allUsers, postImage, getImages, getHotels, postUser, getUser, query, getImagesById };