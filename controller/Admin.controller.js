const User = require('../models/User.model');

exports.index = (req, res) => {
    User.findOne({ username: req.user.username }, async (err, row) => {
        if (err) {
            console.log(err);
            return;
        }
        res.render('admin/index', { title: 'Admin', user: row });
    });
}