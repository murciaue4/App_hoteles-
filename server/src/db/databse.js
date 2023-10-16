const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

const pool = mysql.createPool(
    {
        host: 'localhost',
        user: 'root',
        password: '72420',
        port: 3306,
        database: 'my_db',
    }
);

const tabla = 'user'

const allUsers = async () => {
    const [rows] = await pool.query(`SELECT * FROM ${tabla};`)
    return rows;
};

const postImage = async (req) => {
    const name = req.file.filename;
    const data = fs.readFileSync(path.join(__dirname, '../public/uploads', req.file.filename));
    const type = req.file.mimetype;
    const originalName = req.file.originalname;
    console.log(name, data, type, originalName);

    const [rows] = await pool.query('SELECT originalname FROM images;');

    if (rows.length === 0) {
        const result = await pool.query('INSERT INTO images (name, data, type, originalname) VALUES (?,?,?,?)', [name, data, type, originalName]);
        return result;
    }

    const existNames = rows.map((el) => el.originalname);
    if (!existNames.includes(originalName)) {
        const result = await pool.query('INSERT INTO images (name, data, type, originalname) VALUES (?,?,?,?)', [name, data, type, originalName]);
        return result;
    } else {
        throw new Error('Duplicate name found');
    }
};

const getImages = async () => {
        const [rows] = await pool.query('SELECT * FROM images;')
        await rows.map(el => {
            fs.writeFileSync(path.join(__dirname, '../static/' + el.name), el.data)
        })
        return await rows.map( el => el.name)
};

const getHotels = async () => {
    const [rows] = await pool.query('SELECT * FROM hoteles;');
    return rows
}

module.exports = { allUsers, postImage, getImages, getHotels };