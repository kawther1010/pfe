const User = require('../models/User');

// Handle update request
exports.handleUpdate = (req, res) => {

    User.findByIdAndUpdate(req.user.id, {
        profilePicture: req.file.filename
    }, { new: true })
        .then(user => {
            req.flash('success_msg', 'Your profile picture has been uploaded');
            res.redirect('/');
        })
        .catch(err => console.log(err));
};