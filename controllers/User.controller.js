const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const User = require("../model/User.model");

module.exports = {
    signUpUser: async (req, res) => {
        const errors = validationResult(req.body);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {
            username,
            email,
            password
        } = req.body;

        try {
            let user = await User.findOne({
                email
            });
            if (user) {
                return res.status(400).json({
                    msg: "User Already Exists"
                });
            }

            user = new User({
                username,
                email,
                password
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                "randomString", {
                expiresIn: 10000
            },
                (err, token) => {
                    if (err) throw err;
                    res
                        .cookie("access_token", token, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV === "production"
                        });
                    res
                        .status(200)
                        .json({
                            token
                        });
                }
            );
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    },

    loginUser: async (req, res) => {
        const errors = validationResult(req.body);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const { username, password } = req.body;
        try {
            let user = await User.findOne({
                username
            });
            if (req.cookies.access_token) {
                return res.status(200).json({
                    msg: "User Already Logged In"
                });
            }
            if (!user)
                return res.status(400).json({
                    message: "User Not Exist"
                });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch)
                return res.status(400).json({
                    message: "Incorrect Password!"
                });

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                "randomString",
                {
                    expiresIn: 3600
                },
                (err, token) => {
                    if (err) throw err;
                    res
                        .cookie("access_token", token, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV === "production"
                        });
                    res
                        .status(200)
                        .json({
                            token
                        });
                }
            );
        } catch (e) {
            console.error(e);
            res.status(500).json({
                message: "Server Error"
            });
        }
    },

    getUser: async (req, res) => {
        try {
            // request.user is getting fetched from Middleware after token authentication
            const user = await User.findById(req.user.id);
            res.json(user);
        } catch (e) {
            res.send({ message: "Error in Fetching user" });
        }
    },

    logoutUser: async (req, res) => {
        try {
            const user = await User.findById(req.user.id);
            res.clearCookie("access_token");
            user['msg'] = "User Logged Out";
            res.json(user);
        } catch (e) {
            res.send({
                success: false,
                message: "Error in Logging out user"
            });
        }
    }
}