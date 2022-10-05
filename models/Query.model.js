const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config({ path: '../config.env' });

const QuerySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: [true, 'Name already exists'],
        trim: true,
        maxlength: [50, 'Name cannot be more than 50 characters'],
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: [true, 'Email already exists'],
        trim: true,
        maxlength: [50, 'Email cannot be more than 50 characters'],
    },
    phone: {
        type: String,
        required: [true, 'Please add a phone number'],
        unique: [true, 'Phone number already exists'],
        trim: true,
        maxlength: [15, 'Phone number cannot be more than 15 characters'],
    },
    message: {
        type: String,
        required: [true, 'Please add a message'],
        trim: true,
        maxlength: [500, 'Message cannot be more than 500 characters'],
    }
}, { timestamps: true });

const Query = mongoose.model('query', QuerySchema);

module.exports = Query;
