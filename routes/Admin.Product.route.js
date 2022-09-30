const express = require("express");
const { check, validationResult } = require("express-validator");
const path = require("path");
const multer = require("multer");
const router = express.Router();

const ProductModel = require("../model/Admin.Product.model");
const ProductController = require("../controllers/Admin.Product.controller");

router.get('/', (req, res) => {
    const allProducts = ProductModel.find();
    res.json(allProducts);
})

router.get('/add',
    (req, res) => {
        res.sendFile(path.join(__dirname + '/../views/Admin.Product.add.html'))
    })

router.post('/add',
    [
        check("name", "Please Enter a Valid Product Name")
            .not()
            .isEmpty(),
        check("price", "Please enter a valid price").isNumeric(),
        check("description", "Please enter a valid description").isLength({
            min: 6,
            max: 100
        })
    ], ProductController.addProduct);

router.get('/edit/:id', (req, res) => {
    res.sendFile(path.join(__dirname + '/../views/Admin.Product.edit.html'))
})

// router.post('/update', ProductController.updateProduct);

// router.post('/delete', ProductController.deleteProduct);

module.exports = router;
