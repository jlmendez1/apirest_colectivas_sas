const Bids = require('../models/Bids');

//Crear una puja
exports.add = async (req, res, next) => {
    try{
        const bid = new Bids(req.body);
        await bid.save();

        res.json(bid);
    }catch(error){
        res.status(400).json({
            message: 'Error al procesar la peticion'
        });
    }
};

//Listar todas las pujas
exports.list = async (req, res, next) => {
    try{
        const bids = await Bids.find({})
        .populate('user')
        .populate('auction')
        
        res.json(bids);
    }catch(error){
        res.status(400).json({
            message: 'Error al procesar la peticion'
        });
    }
};

//Listar puja por su id
exports.show = async (req, res, next) => {
    try{
        const bid = await Bids.findById(req.params.id)
        .populate('user')
        .populate('auction');

        if(!bid){
            res.status(404).json({ message: 'La puja solicitada no exite'});
            next();
        }else{
            res.json(bid);
        }
    }catch{
        res.status(400).json({ message: 'Error al procesar la peticion'});
    }
};


//Actualizar puja
exports.update = async (req, res, next) => {
    try{
        const bid = await Bids.findOneAndUpdate(
            {_id: req.params.id },
            req.body,
            { new: true },
        )
        .populate('user')
        .populate('auction');
    
        res.json(bid);
    }catch(error){
        res.status(400).json({
            message: 'Error al procesar la peticion'
        });
    }
};


//Eliminar puja
exports.delete = async(req, res, next) => {
    try{
        await Bids.findOneAndDelete({_id: req.params.id });
        res.json({ message: 'La puja se ha retirado con exito' });
    }catch(error){
        res.status(400).json({ message: 'Error al procesar la peticion' });
    }
};


//Listar pujas de una subasta
exports.byAuctions = async (req, res, next) => {
    try{
        const bids = await Bids.find({ auction: req.params.id })
        .populate('user')
        .populate('auction');

        res.json(bids);

    }catch(error){
        res.status(400).json({ message: 'Error al procesar la peticion' });
    }
};