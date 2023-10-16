const express = require('express');
const path = require('path');
const imgUploadsRoute = require('./routes/imgCRUD.routes');
const { uploader } = require('./middlewares');
const cors = require('cors');



//initializing
const app = express();


//settings
app.set('port', process.env.PORT || 3001);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middlewares
app.use(uploader);
app.use(cors());
app.use(express.static(path.join(__dirname, 'static')));


//router
app.use('/api', imgUploadsRoute);


app.listen(app.get('port'), () => {
    console.log(`Server running on port`, app.get('port'));
})