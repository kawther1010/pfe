const Object = require('../models/Object');

exports.handleBidSubmit = async (req, res) => {
    
    const objectId = req.params.id;
    // Extract the bid amount from the request body
    const bidAmount = req.body.bidAmount;

    try {
        // Find the object in the database
        const object = await Object.findById(objectId);

        if (!object) {
            return res.status(404).send('Object not found');
        }

        // Check if the bid is higher than the current price
        if (object.currentPrice && bidAmount <= object.currentPrice) {
            return res.status(400).send('Bid amount must be higher than current price');
        }

        // Add the new bid to the bids array of the object
        object.bids.push({
            bidder: req.user._id,
            amount: bidAmount,
            timestamp: Date.now()
        });

        // Update the current price of the object
        object.currentPrice = bidAmount;

        // Save the object to the database
        await object.save()

        req.flash('success_msg', 'Bid Submitted successfully!');
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving bid to database');
    }
}