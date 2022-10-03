const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config({ path: '../config.env' });

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    last_name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 5
    },
    hashed_password: {
        type: String,
        required: true,
        trim: true
    },
    salt: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    }
}, { timestamps: true });

const User = mongoose.model('users', UserSchema);

module.exports = User;
