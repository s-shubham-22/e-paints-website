const slug = require('slug');
const fs = require('fs');

const User = require('../models/User.model');
const Brand = require('../models/Brand.model');

exports.getIndex = (req, res) => {
    User.findOne({ username: req.user.username }, async (err, row) => {
        if (err) {
            console.log(err);
            return;
        }
        const brands = await Brand.find();
        res.render('admin/brandIndex.ejs', { title: 'Admin', user: row, brands: brands });
    });
}

exports.getCreate = (req, res) => {
    User.findOne({ username: req.user.username }, async (err, row) => {
        if (err) {
            console.log(err);
            return;
        }
        res.render('admin/brandCreate.ejs', { title: 'Admin', user: row });
    });
}

exports.postCreate = async (req, res) => {
    try {
        const { name } = req.body;
        const image = req.file.filename;
        const slugName = slug(name, { lower: true });
        const brand = new Brand({ name, image, slug: slugName });
        await brand.save();
        res.redirect('/admin/brand');
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Server Error' });
    }
}

exports.getEdit = async (req, res) => {
    try {
        const brand = await Brand.findById(req.params.id);
        User.findOne({ username: req.user.username }, async (err, row) => {
            if (err) {
                console.log(err);
                return;
            }
            res.render('admin/brandEdit.ejs', { title: 'Admin', user: row, brand: brand });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Server Error' });
    }
}

exports.postEdit = async (req, res) => {
    try {
        const { name } = req.body;
        const image = req.file.filename;
        const slugName = slug(name, { lower: true });
        const brand = await Brand.findByIdAndUpdate(req.params.id, { name, image, slug: slugName });
        await brand.save();
        res.redirect('/admin/brand');
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Server Error' });
    }
}

exports.postDelete = async (req, res) => {
    try {
        await Brand.findByIdAndDelete(req.params.id)
            .then(() => {
                res.redirect('/admin/brand');
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
        const brand = await Brand.findById(id);
        brand.status = !brand.status;
        await brand.save();
        res.json({ status: brand.status });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Server Error' });
    }
}