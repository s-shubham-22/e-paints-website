const User = require('../models/User.model');
const Contact = require('../models/Contact.model');

exports.getIndex = (req, res) => {
    User.findOne({ username: req.user.username }, async (err, row) => {
        if (err) {
            console.log(err);
            return;
        }
        const contact = await Contact.findOne();
        res.render('admin/contact/contactIndex.ejs', { title: 'Admin', user: row, contact: contact });
    });
}

exports.postCreate = async (req, res) => {
    try {
        const { email, phone, address } = req.body;
        const contact = await Contact.findOne();
        if (contact) {
            contact.email = email;
            contact.phone = phone;
            contact.address = address;
            await contact.save();
            res.redirect('/admin/contact');
        } else {
            const newContact = await Contact.create({
                email,
                phone,
                address
            });
            await newContact.save();
            res.redirect('/admin/contact');
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: err });
    }
}