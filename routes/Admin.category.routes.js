const express = require('express');

const { isLoggedIn, isAdmin } = require('../middleware/Auth.middleware')
const { getIndex, getCreate, postCreate, getEdit, postEdit, postDelete, changeStatus } = require('../controller/Admin.category.controller');

const router = express.Router();

router.use('/', isLoggedIn, isAdmin, express.static('public'))

router.get('/', getIndex);
router.get('/create', getCreate);
router.post('/create', postCreate);
router.get('/edit/:id', getEdit);
router.post('/edit/:id', postEdit);
router.get('/delete/:id', postDelete);
router.post('/changeStatus/:id', changeStatus);

module.exports = router;