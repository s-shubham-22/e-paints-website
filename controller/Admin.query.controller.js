const User = require('../models/User.model');
const Query = require('../models/Query.model');

exports.getIndex = (req, res) => {
    User.findOne({ username: req.user.username }, async (err, row) => {
        if (err) {
            console.log(err);
            return;
        }
        const query = await Query.find();
        res.render('admin/query/queryIndex.ejs', { title: 'Admin', user: row, query: query });
    });
}

exports.postDelete = async (req, res) => {
    try {
        await Query.findByIdAndDelete(req.params.id)
            .then(() => {
                res.redirect('/admin/query');
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ err: err });
            });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: err });
    }
}