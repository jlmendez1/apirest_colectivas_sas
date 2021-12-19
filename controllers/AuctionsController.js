const multer = require('multer');
const multerConfig = require('../utils/multerConfig');
const Auctions = require('../models/Auctions');

//Procesar el guardado de imagenes.
const upload = multer(multerConfig).single('image');

//PROCESO DE CARGA DE IMAGENES
exports.fileUpload = (req, res, next) => {
    upload(req, res, function(error) {
        if(error){
            res.json({message: error});
        }
        return next();
    });
};



//Listar Subastas
exports.list = async (req, res, next) => {
    try{
        const auctions = await Auctions.find({});
        res.json(auctions);
    }catch(error){
        console.log(error);
        res.status(400).json({
            message: 'Ha ocurrido un error al procesar la peticion.'
        });
        next();
    }
};

//Segunda accion: REGISTRAR SUBASTA
exports.add = async (req, res, next) => {
    const auction = new Auctions(req.body);
    try{
        if(req.file && req.file.filename){
            auction.image = req.file.filename;
        }
        await auction.save();
        res.json({ message: 'La subasta se ha registrado con Exito!'});
    } catch(error){
        console.log(error);
        res.status(400).json({
            message: 'Ha ocurrido un error al procesar la peticion.'
        });
        next();
    }
};

//LISTAR SUBASTA POR SU ID
exports.show = async (req, res, next) => {
    try{
        const auction = await Auctions.findById(req.params.id);
        if(!auction){
            res.status(404).json({
                message: 'La subasta ya no existe.'
            });
        }
        res.json(auction);
    } catch(error){
        res.status(400).json({
            message: 'Error al procesar la peticion.'
        });
    }
};

//BUSCAR SUBASTAS POR SU NOMBRE
exports.search = async (req, res, next) => {
    try{
        const auctions = await Auctions.find({
            name: new RegExp(req.params.query, 'i'),
        });
        res.json(auctions);
    }catch(error){
        res.status(400).json({
            message: 'Error al procesar la peticion.'
        });
    }
}

// ACTUALIZAR SUBASTA
exports.update = async (req, res, next) => {
    try{
        let newAuction = req.body;

        if(req.file && req.file.filename){
            newAuction.image = req.file.filename;
        }else{
            const auction = await Auction.findById(req.params.id);
            newAuction.image = auction.image;
        }

        const auctionUpdated = await Auctions.findOneAndUpdate(
            { _id: req.params.id },
            newAuction,
            { new: true}
        );
        res.json({
            message: 'Datos de la Subasta Actualizados con exito!'
        });
    }catch(error){
        console.log(error);
        if(error === 11000){
            res.status(400).json({
                message: 'Ya existe una Subasta registrada con el mismo id'
            });
        }else{
            res.status(400).json({
                message: 'Ha ocurrido un error al procesar la peticion'
            });
            next();
        }
    }
};

// ELIMINAR SUBASTA
exports.delete = async (req, res, next) => {
    try{
        await Auctions.findOneAndDelete({ _id: req.params.id });
        res.json({ message: 'La subasta ha sido eliminada con exito.'});
    }catch(error){
        res.status(400).json({
            message: 'Error al procesar la peticion'
        });
    }
};