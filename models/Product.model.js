const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config({ path: '../config.env' });

const ProductSchema = new mongoose.Schema({
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
    image: {
        type: String,
        default: 'no-photo.jpg',
    },
    price: {
        type: Number,
        required: [true, 'Please add a price'],
        maxlength: [10, 'Price cannot be more than 10 characters'],
    },
    sale_price: {
        type: Number,
        maxlength: [10, 'Sale Price cannot be more than 10 characters'],
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [2000, 'Description cannot be more than 2000 characters'],
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: [true, 'Please add a category'],
    },
    brand: {
        type: mongoose.Schema.ObjectId,
        ref: 'Brand',
        required: [true, 'Please add a brand'],
    },
    stock: {
        type: Number,
        required: [true, 'Please add a stock'],
        maxlength: [5, 'Stock cannot be more than 5 characters'],
    },
    status: {
        type: Boolean,
        default: true,
    }
}, { timestamps: true });

const Product = mongoose.model('products', ProductSchema);

module.exports = Product;
