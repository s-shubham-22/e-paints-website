const express = require('express');
const multer = require('multer');
const path = require('path');

const { isLoggedIn, isAdmin } = require('../middleware/Auth.middleware')
const { getIndex, getCreate, postCreate, getEdit, postEdit, postDelete, changeStatus } = require('../controller/Admin.product.controller');

const router = express.Router();

router.use('/', isLoggedIn, isAdmin, express.static('public'))

// Image Upload
const imageStorage = multer.diskStorage({
    destination: 'public/uploads/product/images', // Destination to store image 
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
        // file.fieldname is name of the field (image), path.extname get the uploaded file extension
    }
});

const imageUpload = multer({
    storage: imageStorage,
    limits: {
        fileSize: 2000000   // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg|PNG|JPG|JPEG)$/)) {     // upload only png and jpg format
            return cb(new Error('Please upload a Image'))
        }
        cb(undefined, true)
    }
})

router.get('/', getIndex);
router.get('/create', getCreate);
router.post('/create', imageUpload.single('image'), postCreate);
router.get('/edit/:id', getEdit);
router.post('/edit/:id', imageUpload.single('image'), postEdit);
router.get('/delete/:id', postDelete);
router.post('/changeStatus/:id', changeStatus);

module.exports = router;