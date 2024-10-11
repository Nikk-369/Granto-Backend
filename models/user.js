const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    totalLoss: {
        type: String,
        required: true,
    },
    utrNumber: {
        type: String,
        default: '',
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('user', userSchema);
