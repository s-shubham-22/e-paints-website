const express = require('express');

const { isLoggedIn, isAdmin } = require('../middleware/Auth.middleware')
const { index } = require('../controller/Admin.controller');

const router = express.Router();

router.use('/', isLoggedIn, isAdmin, express.static('public'))

router.get('/', index);

module.exports = router;