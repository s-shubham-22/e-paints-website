const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config({ path: '../config.env' });

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: [true, 'Name already exists'],
        trim: true,
        maxlength: [50, 'Name cannot be more than 50 characters'],
    },
    slug: {
        type: String,
        required: [true, 'Please add a slug'],
        unique: [true, 'Slug must be unique'],
        trim: true,
        maxlength: [50, 'Slug cannot be more than 50 characters'],
    },
    status: {
        type: Boolean,
        default: true,
    }
}, { timestamps: true });

const Category = mongoose.model('categories', CategorySchema);

module.exports = Category;
