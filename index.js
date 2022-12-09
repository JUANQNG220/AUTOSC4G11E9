//Definición general de variables
const express = require('express');
const app = express();
const admin_routes = require('./routes/administrador');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//declaración de promesas a base de datos
mongoose.Promise = global.Promise;

//definición de puerto
const port = 3000;

//definición de rutas
app.use(bodyParser.urlencoded({extended:false})); //primero debe ir este, sino genera error ¿preguntar al profe?


//realizando la promesa a la base de datos
mongoose.connect('mongodb://localhost:27017/autosc4g11e9db',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    family:4
})
.then(()=>{
    app.use("/api",admin_routes);

    //probando que funcione el puerto
    app. listen(port,()=>{
        console.log('listening on port ' + port + " very well");
    })
})
.catch(error=>console.log(error));

