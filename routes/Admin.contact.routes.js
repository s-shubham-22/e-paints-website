const express = require('express');

const { isLoggedIn, isAdmin } = require('../middleware/Auth.middleware')
const { getIndex, postCreate } = require('../controller/Admin.contact.controller');

const router = express.Router();

router.use('/', isLoggedIn, isAdmin, express.static('public'))

router.get('/', getIndex);
router.post('/create', postCreate);

module.exports = router;