const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config({ path: '../config.env' });

const SliderSchema = new mongoose.Schema({
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
    status: {
        type: Boolean,
        default: true,
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        trim: true,
        maxlength: [1000, 'Description cannot be more than 1000 characters'],
    }
}, { timestamps: true });

const Slider = mongoose.model('sliders', SliderSchema);

module.exports = Slider;
