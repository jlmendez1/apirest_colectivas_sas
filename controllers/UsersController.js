const Users = require('../models/Users');

//Listar Usuarios
exports.list = async (req, res, next) => {
    try{
        const users = await Users.find({})
        .populate('type_user');

        res.json(users);
    }catch(error){
        console.log(error);
        res.status(400).json({
            message: 'Ha ocurrido un error al procesar la peticion.'
        });
        next();
    }
};

//Segunda accion: AÑADIR USERS
exports.add = async (req, res, next) => {
    const user = new Users(req.body);
    try{
        await user.save();
        res.json({ message: 'Nuevo Usuario registrado con Exito!'});
    } catch(error){
        console.log(error);
        if(error.code === 11000){
            res.status(400).json({
                message: `Ya existe un Usuario registrado con el numero de documento: ${req.body.document}`
            });
        }else{
            res.status(400).json({
                message: 'Ha ocurrido un error al procesar la peticion'
            });
            next();
        }
    }
};

//Tercera accion: LISTAR USUARIO POR SU ID
exports.show = async (req, res, next) => {
    try{
        const user = await Users.findById(req.params.id);
        if(!user){
            res.status(404).json({
                message: 'El usuario no existe'
            });
        }

        res.json(user);
    } catch(error){
        res.status(400).json({
            message: 'Error al procesar la peticion.'
        });
    }
};

// Actualizar Usuario
exports.update = async (req, res, next) => {
    try{
        const user = await Users.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true}
        );
        res.json({
            message: 'Datos del Usuario Actualizados con exito!'
        });
    }catch(error){
        console.log(error);
        if(error === 11000){
            res.status(400).json({
                message: `Ya existe un Usuario registrado con el numero de documento: ${req.body.document}`
            });
        }else{
            res.status(400).json({
                message: 'Ha ocurrido un error al procesar la peticion'
            });
            next();
        }
    }
};

// Eliminar Usuario
exports.delete = async (req, res, next) => {
    try{
        await Users.findOneAndDelete({ _id: req.params.id });
        res.json({ message: 'El Usuario ha sido eliminado con exito'});
    }catch(error){
        res.status(400).json({
            message: 'Error al procesar la peticion'
        });
    }
};