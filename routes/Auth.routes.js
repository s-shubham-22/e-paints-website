const express = require('express');
const passport = require('passport');


const { isLoggedIn, isNotLoggedIn, isAdmin } = require('../middleware/Auth.middleware')
const { getLogin, getSignup, getUser, loginUser, logoutUser, signupUser } = require('../controller/Auth.controller');
const { userSignupValidationRules, userLoginValidationRules, validate } = require('../validator/Auth.validator')

const router = express.Router();

router.use('/', express.static('public'))

router.get('/login', isNotLoggedIn, getLogin);
router.get('/signup', isNotLoggedIn, getSignup);
router.get("/user", isLoggedIn, getUser);
router.get("/admin", isLoggedIn, isAdmin, getUser);
router.get('/logout', isLoggedIn, logoutUser);
router.post('/login', userLoginValidationRules, validate, loginUser);
router.post('/signup', userSignupValidationRules, validate, signupUser);

module.exports = router;    