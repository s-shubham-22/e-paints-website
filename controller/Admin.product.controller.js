const slug = require('slug');
const fs = require('fs');

const User = require('../models/User.model');
const Category = require('../models/Category.model');
const Brand = require('../models/Brand.model');
const Product = require('../models/Product.model');

exports.getIndex = (req, res) => {
    User.findOne({ username: req.user.username }, async (err, row) => {
        if (err) {
            console.log(err);
            return;
        }
        const products = await Product.find();
        const categories = await Category.find();
        const brands = await Brand.find();
        res.render('admin/product/productIndex.ejs', { title: 'Admin', user: row, products: products, categories: categories, brands: brands });
    });
}

exports.getCreate = (req, res) => {
    User.findOne({ username: req.user.username }, async (err, row) => {
        if (err) {
            console.log(err);
            return;
        }
        const categories = await Category.find();
        const brands = await Brand.find();
        res.render('admin/product/productCreate.ejs', { title: 'Admin', user: row, categories: categories, brands: brands });
    });
}

exports.postCreate = async (req, res) => {
    try {
        const { name, category, brand, price, sale_price, stock, description } = req.body;
        const image = req.file.filename;
        const slugName = slug(name, { lower: true });
        const product = new Product({ name, image, slug: slugName, category, brand, price, sale_price, stock, description });
        await product.save();
        console.log(product);
        res.redirect('/admin/product');
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: err });
    }
}

exports.getEdit = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        User.findOne({ username: req.user.username }, async (err, row) => {
            if (err) {
                console.log(err);
                return;
            }
            const categories = await Category.find();
            const brands = await Brand.find();
            res.render('admin/product/productEdit.ejs', { title: 'Admin', user: row, product: product, categories: categories, brands: brands });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Server Error' });
    }
}

exports.postEdit = async (req, res) => {
    try {
        const { name, category, brand, price, sale_price, stock, description } = req.body;
        const image = req.file.filename;
        const slugName = slug(name, { lower: true });
        const product = await Product.findByIdAndUpdate(req.params.id, { name, image, slug: slugName, category, brand, price, sale_price, stock, description });
        await product.save();
        res.redirect('/admin/product');
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: err });
    }
}

exports.postDelete = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
            .then(() => {
                res.redirect('/admin/product');
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
        const product = await Product.findById(id);
        product.status = !product.status;
        await product.save();
        res.json({ status: product.status });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Server Error' });
    }
}