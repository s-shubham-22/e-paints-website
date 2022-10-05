const express = require('express');

const { isLoggedIn, isAdmin } = require('../middleware/Auth.middleware')
const { getIndex, postDelete } = require('../controller/Admin.query.controller');

const router = express.Router();

router.use('/', isLoggedIn, isAdmin, express.static('public'))

router.get('/', getIndex);
router.get('/delete/:id', postDelete);

module.exports = router;