const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config({ path: '../config.env' });

const ContactSchema = new mongoose.Schema({
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
    address: {
        type: String,
        required: [true, 'Please add an address'],
        trim: true,
        maxlength: [500, 'Address cannot be more than 500 characters'],
    }
}, { timestamps: true });

const Contact = mongoose.model('contact', ContactSchema);

module.exports = Contact;
