
const express =require('express');
const router = express.Router();

// Import controllers
const typeusersController = require('../controllers/TypeUsersController')
const usersController = require('../controllers/UsersController');
const auctionsController = require('../controllers/AuctionsController');
const bidsController = require('../controllers/BidsController');


module.exports = function(){

    // -------------------- ROUTES TYPE USERS -----------------------------
    //listar tipos de usuario ( get: /typeusers )
    router.get('/typeusers', typeusersController.list);

    //Añadir nuevo tipo de usuario ( post: /typeusers )
    router.post('/typeusers', typeusersController.add);

    //listar Tipo de Usuario por su ID ( get: /typeusers/:id )
    router.get('/typeusers/:id', typeusersController.show);

    //Actualizar Tipo de Usuario ( put: /typeusers/:id )
    router.put('/typeusers/:id', typeusersController.update);

    //Eliminar tipo de Usuario ( delete: /typeusers/:id )
    router.delete('/typeusers/:id', typeusersController.delete);

    //-----------------------------------------------------------------


    // -------------------- ROUTES USERS -----------------------------
    //listar usuarios ( get: /users )
    router.get('/users', usersController.list);

    //Añadir nuevo usuario ( post: /users )
    router.post('/users', usersController.add);

    //listar Usuario por su ID ( get: /users/:id )
    router.get('/users/:id', usersController.show);

    //Actualizar Usuario ( put: /users/:id )
    router.put('/users/:id', usersController.update);

    //Eliminar Usuario ( delete: /users/:id )
    router.delete('/users/:id', usersController.delete);

    //-----------------------------------------------------------------


    // -------------------- ROUTES AUCTIONS -----------------------------
    //listar Subastas ( get: /auctions )
    router.get('/auctions', auctionsController.list);

    //Registrar nueva Subasta ( post: /auctions )
    router.post('/auctions',
     auctionsController.fileUpload,
     auctionsController.add
    );

    //listar Subasta por su ID ( get: /auctions/:id )
    router.get('/auctions/:id', auctionsController.show);

    //Buscar Subastas por su nombre (get: /auctions/search/:query)
    router.get('/auctions/search/:query', auctionsController.search)

    //Actualizar Subasta ( put: /auctions/:id )
    router.put('/auctions/:id',
     auctionsController.fileUpload,
     auctionsController.update
    );

    //Eliminar Subasta ( delete: /auctions/:id )
    router.delete('/auctions/:id', auctionsController.delete);

    //-----------------------------------------------------------------



    // -------------------- ROUTES BIDS -----------------------------
    //listar Pujas ( get: /bids )
    router.get('/bids', bidsController.list);

    //Registrar nueva Puja ( post: /bids )
    router.post('/bids', bidsController.add);

    //Mostrar puja por id (get: /bids/:id)
    router.get('/bids/:id', bidsController.show);

    //Mostrar pujas por subasta (get: /bids/auctions/:id)
    router.get('/bids/auctions/:id', bidsController.byAuctions)

    //Actualizar puja (put: /bids/:id)
    router.put('/bids/:id', bidsController.update);

    //Eliminar puja (delete: /bids/:id)
    router.delete('/bids/:id', bidsController.delete)



    //-----------------------------------------------------------------

    return router;
};