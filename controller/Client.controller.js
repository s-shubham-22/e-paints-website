const User = require('../models/User.model');
const Slider = require('../models/Slider.model');

exports.index = (req, res) => {
    res.render('client/index', { title: 'Admin' });
}