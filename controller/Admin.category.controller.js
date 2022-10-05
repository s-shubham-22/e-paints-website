const slug = require('slug');

const User = require('../models/User.model');
const Category = require('../models/Category.model');

exports.getIndex = (req, res) => {
    User.findOne({ username: req.user.username }, async (err, row) => {
        if (err) {
            console.log(err);
            return;
        }
        const categories = await Category.find();
        res.render('admin/category/categoryIndex.ejs', { title: 'Admin', user: row, categories: categories });
    });
}

exports.getCreate = (req, res) => {
    User.findOne({ username: req.user.username }, async (err, row) => {
        if (err) {
            console.log(err);
            return;
        }
        res.render('admin/category/categoryCreate.ejs', { title: 'Admin', user: row });
    });
}

exports.postCreate = async (req, res) => {
    try {
        const { name } = req.body;
        const slugName = slug(name, { lower: true });
        const category = new Category({ name, slug: slugName });
        await category.save();
        res.redirect('/admin/category');
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: err });
    }
}

exports.getEdit = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        User.findOne({ username: req.user.username }, async (err, row) => {
            if (err) {
                console.log(err);
                return;
            }
            res.render('admin/category/categoryEdit.ejs', { title: 'Admin', user: row, category: category });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: err });
    }
}

exports.postEdit = async (req, res) => {
    try {
        const { name } = req.body;
        const slugName = slug(name, { lower: true });
        const category = await Category.findByIdAndUpdate(req.params.id, { name, slug: slugName });
        await category.save();
        res.redirect('/admin/category');
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: err });
    }
}

exports.postDelete = async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id)
            .then(() => {
                res.redirect('/admin/category');
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ err: err });
            });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: err });
    }
}

exports.changeStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);
        category.status = !category.status;
        await category.save();
        res.json({ status: category.status });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: err });
    }
}