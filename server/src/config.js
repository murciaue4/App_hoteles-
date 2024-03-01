require ('dotenv').config();

module.exports = {

    db: {
      host: process.env.DB_HOST, 
      port: process.env.DB_PORT,
      database: process.env.DB_DATABASE,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD
    },
    jwt: {
      secret: process.env.JET_SECRET || 'nota secreta' 
    } 
    ,
    urlStatic: {
      urlstatic: process.env.URL_STATIC  || 'http://localhost:3333/'
    }
  }; 