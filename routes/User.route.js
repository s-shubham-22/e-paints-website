const express = require("express");
const { check } = require("express-validator");
const path = require("path");
const router = express.Router();

const UserController = require("../controllers/User.controller");
const auth = require("../middleware/auth")

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/../views/login.html'))
})

router.post(
    "/signup",
    // check("username", "Please Enter a Valid Username")
    [
        check("username", "Please Enter a Valid Username")
            .not()
            .isEmpty(),
        check("email", "Please enter a valid email").isEmail(),
        check("password", "Please enter a valid password").isLength({
            min: 6
        })
    ],
    UserController.signUpUser
);

router.post(
    "/login",
    [
        check("email", "Please enter a valid email").isEmail(),
        check("password", "Please enter a valid password").isLength({
            min: 6
        })
    ],
    UserController.loginUser
);

router.get("/me", auth, UserController.getUser);

router.get("/logout", auth, UserController.logoutUser);

module.exports = router;