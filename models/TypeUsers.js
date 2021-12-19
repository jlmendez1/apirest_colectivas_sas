const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const typeusersSchema = new Schema({
    identifier: {
        type: Number,
        unique: true,
    },
    name: {
        type: String,
    },
    description: {
        type: String,
    },
});

module.exports = mongoose.model('TypeUsers', typeusersSchema);