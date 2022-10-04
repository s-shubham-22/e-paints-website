const slug = require('slug');
const fs = require('fs');

const User = require('../models/User.model');
const Slider = require('../models/Slider.model');

exports.getIndex = (req, res) => {
    User.findOne({ username: req.user.username }, async (err, row) => {
        if (err) {
            console.log(err);
            return;
        }
        const sliders = await Slider.find();
        res.render('admin/sliderIndex.ejs', { title: 'Admin', user: row, sliders: sliders });
    });
}

exports.getCreate = (req, res) => {
    User.findOne({ username: req.user.username }, async (err, row) => {
        if (err) {
            console.log(err);
            return;
        }
        res.render('admin/sliderCreate.ejs', { title: 'Admin', user: row });
    });
}

exports.postCreate = async (req, res) => {
    try {
        const { name, description } = req.body;
        const image = req.file.filename;
        const slugName = slug(name, { lower: true });
        const slider = new Slider({ name, image, description, slug: slugName });
        await slider.save();
        res.redirect('/admin/slider');
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: err });
    }
}

exports.getEdit = async (req, res) => {
    try {
        const slider = await Slider.findById(req.params.id);
        User.findOne({ username: req.user.username }, async (err, row) => {
            if (err) {
                console.log(err);
                return;
            }
            res.render('admin/sliderEdit.ejs', { title: 'Admin', user: row, slider: slider });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Server Error' });
    }
}

exports.postEdit = async (req, res) => {
    try {
        const { name, description } = req.body;
        const image = req.file.filename;
        const slugName = slug(name, { lower: true });
        const slider = await Slider.findByIdAndUpdate(req.params.id, { name, image, description, slug: slugName });
        await slider.save();
        res.redirect('/admin/slider');
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Server Error' });
    }
}

exports.postDelete = async (req, res) => {
    try {
        await Slider.findByIdAndDelete(req.params.id)
            .then(() => {
                res.redirect('/admin/slider');
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ err: 'Server Error' });
            });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Server Error' });
    }
}

exports.changeStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const slider = await Slider.findById(id);
        slider.status = !slider.status;
        await slider.save();
        res.json({ status: slider.status });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Server Error' });
    }
}