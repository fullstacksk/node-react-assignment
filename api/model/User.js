const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim:true,
        min: 2,
        max:255
    },
    email: {
        type: String,
        unique: true,
        lowercase:true,
        required: true,
        max:255
    },
    role: {
        type: String,
        required: true,
        max:255
    },
    age: {
        type: Number,
        required: true,
        default:0
    },
    mobile: {
        type: String,
        required: true,
        min: 10,
        max:10
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
    },
    avatar: {
        type: Buffer
    }
}, {
    timestamps:true
})

module.exports = mongoose.model('User', userSchema);