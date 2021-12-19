//importacion de librerias
const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('./routes');

const app = express();

//conexion a la base de datos.
mongoose.Promise = global.Promise;
mongoose.connect(
    'mongodb://localhost/compras-colectivas',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    (err) => {
        if(err){
            console.log('----- Error de conexión a la base de datos -------');
        }else{
            console.log('------ Se ha establecido correctamente la conexión a la base de datos -----');
        }
    }
);

//Habilitar body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Hablitar cors
app.use(cors());

app.use('/', routes());

app.use(express.static('uploads'));

app.listen(5000, function(){
    console.log("Servidor web express en ejecucion..");
});