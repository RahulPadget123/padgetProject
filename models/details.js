const mongoose = require('mongoose');

const detailsSchema = mongoose.Schema({
    model: {
        type: String,
    },
    stdMp: {
        type: Number
    },
    actualMp: {
        type: Number
    },
    stdUph: {
        type: Number
    },
    actualUph: {
        type: Number
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    project: {
        type: String
    },
    section: {
        type: String
    }
});

module.exports = mongoose.model("details", detailsSchema);