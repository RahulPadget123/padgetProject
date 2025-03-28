const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    details: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'details'
        }
    ]
});

module.exports = mongoose.model("user", userSchema);