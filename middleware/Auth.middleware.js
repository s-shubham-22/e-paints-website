const User = require('../models/User.model');

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/api/auth/login");
}

exports.isAdmin = (req, res, next) => {
    User.findOne({ _id: req.user.id }, (err, user) => {
        if (err) {
            console.log(err)
        }
        if (user.role === "admin") {
            return next();
        }
        res.redirect("/api/auth/login");
    })
}

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('back');
}