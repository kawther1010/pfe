const User = require('../models/User');

// Handle update request
exports.handleUpdate = (req, res) => {
    const { firstName, lastName, email, bio } = req.body;
    let errors = []

    // Check required fields
    if (!firstName || !lastName || !email) {
        errors.push({ msg: 'Please fill in all fields' })
    }

    if (errors.length > 0) {
        res.render('account-settings', {
            errors
        });
    } else {
        User.findByIdAndUpdate(req.user.id, {
            firstName,
            lastName,
            email,
            bio,
        }, { new: true })
            .then(user => {
                req.flash('success_msg', 'Your profile has been updated');
                res.redirect('/users/profile');
            })
            .catch(err => console.log(err));
    }
};