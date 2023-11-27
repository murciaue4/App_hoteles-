const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const dbConfig = require('../config');
const { error } = require('console');


const pool = mysql.createPool(dbConfig.db);



//_____________________________POST________________________________________

const postUser = async (tabla, body) => {
  const result = await pool.query(`INSERT INTO ${tabla} SET ? ON DUPLICATE KEY UPDATE ?;`, [body, body]);
  return result;
};
const postHotel = async (tabla, body) => {
  const result = await pool.query(`INSERT INTO ${tabla} SET ? ON DUPLICATE KEY UPDATE ?;`, [body, body]);
  return result;
};
const postImage = async (tabla, req, idHotel, idUser) => {
  const files = req.files; // req.files contendrá la matriz de archivos si utilizas .array('images')

  const insertImageToDatabase = async (file) => {
    
    // Extraigo los parámetros del archivo que se encuentra en el objeto file de la request y de la base de datos.
    const name = file.filename;
    const data = fs.readFileSync(path.join(__dirname, '../public/uploads', file.filename));
    const type = file.mimetype;
    const originalName = file.originalname;
    const dataBody = {
      name,
      data,
      type,
      originalName,
    };
    if (idHotel) {
      dataBody.id_hotel = idHotel
    }
    if (idUser) {
      dataBody.id_user = idUser
    }

    const [rows] = await pool.query(`SELECT originalname FROM ${tabla};`);

    // Si es el primer dato, lo insertamos en la base de datos. Si no, filtramos para que no esté duplicado, filtramos por nombre original.
    if (rows.length === 0 || !rows.some((el) => el.originalname === originalName)) {
      const result = await pool.query(`INSERT INTO ${tabla} SET ? ON DUPLICATE KEY UPDATE ?;`, [dataBody, dataBody]);
      console.log(result);
      return result;
    } else {
      console.log(`La imagen con nombre ${originalName} ya existe en la base de datos.`);
      return null;
    }
  };

  // Procesar cada archivo en la matriz
  const results = await Promise.all(files.map(insertImageToDatabase));
  return results;
};



//****************************UPDATE*******************************/

const updateHotel = async (tabla, body, id) => {
  const field = Object.keys(body)[0]
  console.log( 'BODY on database: ', body[field]);
  try {
    if (!body || !body.description) {
      throw new error('Description is missing in the request body.');
    }

    const result = await pool.query(`UPDATE ?? SET ${field} = '${body[field]}' WHERE id = ?`, [tabla, body.description, id]);
    console.log('Result from updateHotel in database: ', result);
    return result;
  } catch (error) {
    console.error('Error in updateHotel:', error);
    throw error;
  }
};
const updateUSer = async (tabla, body, id) => {
  const field = Object.keys(body).map(el=`${el} = '${body[el]}'`)
  console.log( 'BODY on database: ', field);
  try {
    if (!body || !body.description) {
      throw new error('Description is missing in the request body.');
    }

    const result = await pool.query(`UPDATE ?? SET ? WHERE id = ?`, [tabla, field, body.description, id]);
    console.log('Result from updateHotel in database: ', result);
    return result;
  } catch (error) {
    console.error('Error in updateHotel:', error);
    throw error;
  }
};

/*UPDATE clientes
SET estado = 'Activo'
WHERE id = 1; */
//--------------------------------GET----------------------------------

const allUsers = async (tabla) => {
  const [rows] = await pool.query(`SELECT * FROM ${tabla};`)
  return rows;
};
const getUser = async (tabla, id) => {
  const [rows] = await pool.query(`SELECT * FROM ${tabla} WHERE id = ?;`, [id])
  return rows;
};
const getHotels = async (tabla) => {
  const [rows] = await pool.query(`SELECT * FROM ${tabla};`);
  return rows
};
const getHotel = async (tabla, id) => {
  const [rows] = await pool.query(`SELECT * FROM ${tabla} WHERE id = ${id};`);
  return rows
};
const getHotelByUser = async (tabla, id) => {
  const [rows] = await pool.query(`SELECT * FROM my_db.${tabla} WHERE id_user = ${id};`);
  return rows
};
const query = async (tabla, data) => {
  const [rows] = await pool.query(`SELECT * FROM ${tabla} WHERE username = ? ;`, [data]);
  return rows;
};
const query2 = async (tabla, data) => {
  const [rows] = await pool.query(`SELECT * FROM ${tabla} WHERE email = ? ;`, [data]);
  return rows;
};
const getImagesById = async (tabla, HotelId) => {
  const [images] = await pool.query(`SELECT * FROM ${tabla} WHERE id_hotel = ${HotelId}`)
  const data = images.map((el) => el.name)
  return data
};
const getImages = async (tabla) => {
  const [rows] = await pool.query(`SELECT * FROM ${tabla};`)
  await rows.map(el => {
    fs.writeFileSync(path.join(__dirname, '../static/' + el.name), el.data)
  })
  return await rows.map(el => el)
};
module.exports = { updateHotel, allUsers, postImage, getImages, getHotels, getHotel, postUser, getUser, query, getImagesById, postHotel, getHotelByUser, updateUSer , query2};