exports.handleLogout = (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
            return next(err);
        }
        req.flash('success_msg', 'You are logged out')
        res.redirect('/auth/login')
    });
};
