const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bidsSchema = new Schema({
    created: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: Schema.ObjectId,
        ref: 'Users',
    },
    auction: {
        type: Schema.ObjectId,
        ref: 'Auctions',
    },
    bid_amount: {
        type: Number,
    },
});

module.exports = mongoose.model('Bids', bidsSchema);