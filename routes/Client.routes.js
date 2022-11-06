const express = require('express');

const { isLoggedIn } = require('../middleware/Auth.middleware')
const { index } = require('../controller/Client.controller');

const router = express.Router();

router.use('/', express.static('public'))

router.get('/', index);

module.exports = router;