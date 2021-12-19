const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const usersSchema = new Schema({
    fullname: {
        type: String,
        trim: true,
    },
    document: {
        type: String,
        trim: true,
        unique: true,
    },
    date_birth: {
        type: String,
        trim: true,
    },
    doc_issue_date: {
        type: String,
        trim: true,
    },
    type_user: {
        type: Schema.ObjectId,
        ref: 'TypeUsers',
    },
});

module.exports = mongoose.model('Users', usersSchema);