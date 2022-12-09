const { restart } = require("nodemon");
var validator =require("validator");
var Admon = require('../models/administradores');

var controller = {
    
    //funciones para probar que funcione la conexión
    probando: function(req, res){
        return res.status(200).send({
            mesagge:"metodo probando. ok"
        });
    },

    testeando: function(req,res){
        return res.status(200).send({
            mesagge:"testeando, validando el post"
        });
    },

    //funciones del proyecto (CRUD)

    save:function(req,res){
        
        //definición variables de la funcion
        var params = req.body;
        var validate_name = !validator.isEmpty(params.nombre);
        var validate_correo = validator.isEmail(params.correo) && !validator.isEmpty(params.correo);
        var validate_password = !validator.isEmpty(params.password);
        
        //validaciones x consola que si envie la info
        console.log(validate_name);
        console.log(validate_correo);
        console.log(validate_password);

        //validación e ingeso a base de datos
        if(validate_name &&validate_correo &&validate_password){
            var admon = new Admon();
            admon.nombre = params.nombre;
            admon.correo=params.correo;
            admon.password = params.password;
            console.log(admon);

            admon.save((error,admonStored)=>{
                if(error || !admonStored){
                    return res.status(404).send({
                    message:"el administrador no ha sido guardado",
                    status: "error"
                    });        
                }
            })
            return res.status(200).send({
                message: "funcion guardado administrador",
                admon
            });
        }
        else{
            return res.status(200).send({
                message:" usuario no guardado, faltan diligenciar correctamente datos"
            });
        }
    },

    login:function(req,res){
        return res.status(200).send({
            message: "funcion login administrador"
        });
    },

    update:function(req,res){
        var params = req.body;
        var admonId = req.params.id;
        console.log(admonId);
        
        //definición variables de la funcion
        var params = req.body;
        var validate_name = !validator.isEmpty(params.nombre);
        var validate_correo = validator.isEmail(params.correo) && !validator.isEmpty(params.correo);
        var validate_password = !validator.isEmpty(params.password);

        //validación e ingeso a base de datos
        if(validate_name &&validate_correo &&validate_password){
            
            var update = {
                nombre:params.nombre,
                correo:params.correo,
                password:params.password
            }

            Admon.findOneAndUpdate({admonId},update,{new:true},(err,admonUpdate)=>{
                if(err){
                    return res.status(500).send({
                        message:"Error en la petición de actualización",
                        status: "Error",
                    });
                }
                if(!admonUpdate){
                    return res.status(404).send({
                        message:"Administrador no actualizado, no se encontro en basee datos",
                        status: "Error"
                    });
                }

                return res.status(200).send({
                    message: "funcion actualizar administrador",
                    status: "Success",
                    admonUpdate
                    });
            });

            
        }
        else{
            return res.status(200).send({
                mesagge:"validación de datos incorrecta",
                status: "error"
            });
        }
    },

    listaAdministradores:function(req,res){
        
        Admon.find(function(err,doc){
            console.log(doc);
            return res.status(200).send({
            message: "probando funcion consulta listas administradores",
            doc
            });
        });
    },

    mostrarAdministrador:function(req,res){
        var admonId = req.params.id;
        Admon.findById(admonId)
            .exec((err,admon)=>{
                if(err){
                    return res.status(500).send({
                        message:"Error en la petición de consulta",
                        status: "Error",
                    });
                }
                if(!admon){
                    return res.status(404).send({
                        message:"Administrador no encontrado en base datos",
                        status: "Error"
                    });
                }
                return res.status(200).send({
                    message: "funcion consulta 1 administrador",
                    admon
                });
            })

    },

    delete:function(req,res){
        var admonId = req.params.id;
        Admon.findOneAndDelete({id:admonId},(err,admonRemoved)=>{
            if(err){
                return res.status(500).send({
                    message:"Error en la petición de eliminación",
                    status: "Error",
                });
            }
            if(!admonRemoved){
                return res.status(404).send({
                    message:"Administrador no eliminado, no se encontro en base datos",
                    status: "Error"
                });
            }
            return res.status(200).send({
            message: "funcion eliminar",
            admon:admonRemoved
            });
        });

        
    }
}

module.exports = controller;