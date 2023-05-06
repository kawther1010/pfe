const Object = require('../models/Object');

exports.handleCreation = (req, res) => {
    // Extract data from the form submission
    const { title, category, description, startingPrice, endDate } = req.body;
    const seller = req.user._id;
    const image = req.file.filename;

    let errors = [];

    // Check required fields
    if (!title || !category || !description || !startingPrice || !endDate) {
        errors.push({ msg: 'Please fill in all fields' })
    }

    // Check if endDate is before the current date and time
    const endTimestamp = new Date(endDate).getTime();
    const currentTimestamp = Date.now();
    if (endTimestamp < currentTimestamp) {
        errors.push({ msg: 'End date must be in the future' })
    }

    if (errors.length > 0) {
        res.render('sell', {
            errors,
            title,
            category,
            description,
            startingPrice,
            endDate,
            isLoggedIn: true
        })
    } else {
        // Create a new object using the Object model
        const newObject = new Object({
            title,
            category,
            description,
            startingPrice,
            endDate,
            seller,
            image,
        });

        // Save the new object to the database
        newObject.save()
            .then(object => {
                req.flash('success_msg', 'Object created successfully!');
                res.redirect('/');
            })
            .catch(err => {
                console.error(err);
                req.flash('error_msg', 'An error occurred while creating the object.');
                res.redirect('/users/sell');
            });
    }
};
