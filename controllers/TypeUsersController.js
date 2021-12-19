const TypeUsers = require('../models/TypeUsers');

//Listar tipos de usuario
exports.list = async (req, res, next) => {
    try{
        const typeusers = await TypeUsers.find({});
        res.json(typeusers);
    }catch(error){
        console.log(error);
        res.status(400).json({
            message: 'Ha ocurrido un error al procesar la peticion.'
        });
        next();
    }
};

//Añadir tipos de usuario
exports.add = async (req, res, next) => {
    const typeuser = new TypeUsers(req.body);
    try{
        await typeuser.save();
        res.json({ message: 'Nuevo Tipo de Usuario registrado con Exito!'});
    } catch(error){
        console.log(error);
        if(error.code === 11000){
            res.status(400).json({
                message: `Ya existe un Tipo de Usuario registrado con el identificador: ${req.body.identifier}`
            });
        }else{
            res.status(400).json({
                message: 'Ha ocurrido un error al procesar la peticion'
            });
            next();
        }
    }
};

//Listar tipo de usuario por su Id
exports.show = async (req, res, next) => {
    try{
        const typeuser = await TypeUsers.findById(req.params.id);
        if(!typeuser){
            res.status(404).json({
                message: 'El tipo de Usuario referenciado no existe'
            });
        }
        res.json(typeuser);
    } catch(error){
        res.status(400).json({
            message: 'Error al procesar la peticion.'
        });
    }
};

// Actualizar tipo de Usuario
exports.update = async (req, res, next) => {
    try{
        const typeuser = await TypeUsers.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true}
        );
        res.json({
            message: 'Datos del Tipo de Usuario Actualizados con exito!'
        });
    }catch(error){
        console.log(error);
        if(error === 11000){
            res.status(400).json({
                message: `Ya existe un Tipo de Usuario registrado con el numero de id: ${req.body.id}`
            });
        }else{
            res.status(400).json({
                message: 'Ha ocurrido un error al procesar la peticion'
            });
            next();
        }
    }
};

// Eliminar Tipo de Usuario
exports.delete = async (req, res, next) => {
    try{
        await TypeUsers.findOneAndDelete({ _id: req.params.id });
        res.json({ message: 'El Tipo de Usuario ha sido eliminado con exito'});
    }catch(error){
        res.status(400).json({
            message: 'Error al procesar la peticion'
        });
    }
};