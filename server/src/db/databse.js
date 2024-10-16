const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const dbConfig = require('../config');
const { error } = require('console');


const pool = mysql.createPool(dbConfig.db);



//_____________________________POST________________________________________
 

const postComment = async (tabla, body) => {
  const result = await pool.query(`INSERT INTO ${tabla} SET ? ON DUPLICATE KEY UPDATE timestamp = CURRENT_TIMESTAMP, ?;`, [body, body]);
  return result;
};
const postRate = async (tabla, body) => {
  const result = await pool.query(`INSERT INTO ${tabla} SET ? ON DUPLICATE KEY UPDATE timestamp = CURRENT_TIMESTAMP, ?;`, [body, body]);
  return result;
};
const postUser = async (tabla, body) => {
  const result = await pool.query(`INSERT INTO ${tabla} SET ? ON DUPLICATE KEY UPDATE ?;`, [body, body]);
  return result;
};
const postHotel = async (tabla, body) => {
  const result = await pool.query(`INSERT INTO ${tabla} SET ? ON DUPLICATE KEY UPDATE ?;`, [body, body]);
  return result;
};

const postImage = async (tabla, req, idHotel, idUser) => {
  const files = req.files; // req.files contendrá la matriz de archivos si utilizo .array('images')

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
      dataBody.id_hotel = idHotel;
    }
    if (idUser) {
      dataBody.id_user = idUser;
    }

    const [rows] = await pool.query(`SELECT originalname FROM ${tabla} WHERE id_hotel = ?;`, [idHotel]);

    // Si es el primer dato, lo insertamos en la base de datos. Si no, filtramos para que no esté duplicado, filtramos por nombre original.
    if (rows.length === 0 || !rows.some((el) => el.originalname === originalName)) {
      const result = await pool.query(`INSERT INTO ${tabla} SET ? ON DUPLICATE KEY UPDATE ?;`, [dataBody, dataBody]);
      console.log(result);

      // Eliminar el archivo temporal después de guardarlo en la base de datos
      fs.unlink(path.join(__dirname, '../public/uploads', file.filename), (err) => {
        if (err) {
          console.error(`Error eliminando el archivo temporal: ${file.filename}`);
        } else {
          console.log(`Archivo temporal eliminado: ${file.filename}`);
        }
      });

      return result;
    } else {
      console.log(`La imagen con nombre ${originalName} ya existe en la base de datos.`);
      
      // Eliminar el archivo temporal ya que no se necesita
      fs.unlink(path.join(__dirname, '../public/uploads', file.filename), (err) => {
        if (err) {
          console.error(`Error eliminando el archivo temporal: ${file.filename}`);
        } else {
          console.log(`Archivo temporal eliminado: ${file.filename}`);
        }
      });

      return null;
    }
  };

  // Procesar cada archivo en la matriz
  const results = await Promise.all(files.map(insertImageToDatabase));
  return results;
};

module.exports = { postImage };

const postImgUser = async (tabla, req, idUser) => {
  try {
    const files = req.files;

    const insertImageToTable = async (file) => {
      try {
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
        if (idUser) {
          dataBody.id_user = idUser;
        };

        const result = await pool.query(`INSERT INTO ${tabla} SET ? ON DUPLICATE KEY UPDATE ?;`, [dataBody, dataBody]);
        return result;

      } catch (insertError) {
        console.error(`Error al insertar la imagen en la base de datos: ${insertError.message}`);
        throw insertError; // Re-lanzar el error para que pueda ser manejado por el bloque catch externo
      }
    };

    const results = await Promise.all(files.map(insertImageToTable));
    return results;
  } catch (error) {
    console.error(`Error en la función postImgUser: ${error.message}`);
    throw error; // Re-lanzar el error para que pueda ser manejado por el código que llama a postImgUser
  }
};


//________________________________GET_________________________________________


const getRatingUser = async (tabla, id) => {
  const [rows] = await pool.query(`SELECT * FROM ${tabla} WHERE id_user = ${id};`)
  return rows;
};
const getCommentUser = async (tabla, id) => {
  const [rows] = await pool.query(`SELECT * FROM ${tabla} WHERE id_user = ${id};`)
  return rows;
};
const getRatingHotel = async (tabla, id) => {
  const [rows] = await pool.query(`SELECT * FROM ${tabla} WHERE id_hotel = ${id};`)
  return rows;
};
const getCommentHotel = async (tabla, id) => {
  const [rows] = await pool.query(`SELECT * FROM ${tabla} WHERE id_hotel = ${id};`)
  return rows;
};
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
const getUserImg = async (tabla, userId) => {
  const [image] = await pool.query(`SELECT * FROM ${tabla} WHERE id_user = ${userId}`)
  await image.map(el => {
    fs.writeFileSync(path.join(__dirname, '../static/' + el.name), el.data)
  })
  return await image[0].name
};
const getImages = async (tabla) => {
  const [rows] = await pool.query(`SELECT * FROM ${tabla};`)
  await rows.map(el => {
    fs.writeFileSync(path.join(__dirname, '../static/' + el.name), el.data)
  })
  return await rows.map(el => el)
};




//_____________________________________UPDATE_____________________________________


const updateUser = async (tabla, body, userId) => {
  try {
    const result = await pool.query(`UPDATE ${tabla} SET ? WHERE id = ?`, [body, userId]);
    return result;
  } catch (error) {
    console.error('Error en updateUser:', error);
    throw error;
  }
};
const updateHotel = async (tabla, body, id) => {
  try {
    const fieldsToUpdate = {};
    const allowedFields = ['name', 'location', 'capacity', 'type', 'camas', 'baño_privado', 'wifi', 'restaurant', 'lavanderia', 'parqueadero', 'aire_acondicionado', 'precio_por_habitacion', 'description'];

    // Filtra solo los campos permitidos y presentes en el objeto body
    Object.keys(body).forEach(key => {
      if (allowedFields.includes(key)) {
        fieldsToUpdate[key] = body[key];
      }
    });

    if (Object.keys(fieldsToUpdate).length === 0) {
      // Si no hay campos para actualizar, no se realiza ninguna operación
      console.log('No hay campos para actualizar.');
      return;
    }

    // Construye la consulta SQL dinámica para actualizar los campos seleccionados
    const sql = `UPDATE ?? SET ? WHERE id = ?`;
    const values = [tabla, fieldsToUpdate, id];

    // Ejecuta la consulta SQL
    const result = await pool.query(sql, values);
    console.log('Resultado de la actualización en la base de datos:', result);
    return result;
  } catch (error) {
    console.error('Error en updateHotel:', error);
    throw error;
  }
};




//______________________________________DELETE________________________________________

const deleteRating = async (tabla, id) => {
  const result = await pool.query(`DELETE * FROM ${tabla} WHERE id=${id}`)
  return result;
  //aqui tiene que llegar el id del comentario
};



module.exports = {
  updateHotel,
   allUsers, 
   postImage, 
   postImgUser, 
   getImages, 
   getHotels, 
   getHotel, 
   postUser, 
   getUser, 
   query, 
   getImagesById, 
   getUserImg, 
   postHotel, 
   getHotelByUser, 
   query2, 
   updateUser,
   postComment,
   postRate,
   getRatingHotel,
   getRatingUser,
   getCommentUser,
   getCommentHotel,
   deleteRating
};