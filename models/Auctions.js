const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const auctionsSchema = new Schema({
    name: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    image: {
        type: String,
        trim: true,
    },
    cancel_deadline: {
        type: Date,
    },
    initial_date: {
        type: Date,
        default: Date.now,
    },
    deatline: {
        type: Date,
    },
    initial_amount: {
        type: Number,
    },
});

//auctionsSchema.virtual('cancel_deadline_virtual')
//.set(function(fecha) {
    // El formato esperado es 'yyyy-mm-dd' que es el devuelto por el campo input
    // el valor recibido se almacenará en el campo fecha_nacimiento_iso de nuestro documento
    //this.cancel_deadline = new Date(fecha);
//})
//.get(function)

module.exports = mongoose.model('Auctions', auctionsSchema);