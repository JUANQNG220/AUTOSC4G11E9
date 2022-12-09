//Declaración de variables
var express = require('express');
var AdminController = require('../controllers/administrador');
var router = express.Router();

//definición de rutas prueba
router.get('/probando', AdminController.probando);
router.post('/testeando', AdminController.testeando);
//definición de rutas CRUD
router.post('/guardaradmon', AdminController.save);
router.post('/loginadmon', AdminController.login);
router.put('/actualizadmon/:id', AdminController.update);
router.delete('/eliminaradmon/:id', AdminController.delete);
router.get('/listadmones', AdminController.listaAdministradores)
router.get('/mostraradmon/:id', AdminController.mostrarAdministrador)


//exportación de los modulos
module.exports = router;