//importamos elementos para trabajar
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

//definimos variables
var AdmonesSchema = Schema({
    nombre: String,
    correo: String,
    password: String
});

//Exportamos el modulo
module.exports = mongoose.model('Admones',AdmonesSchema);