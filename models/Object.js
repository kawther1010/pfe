const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('./User');

const objectSchema = new Schema({
    // The `User` who is selling the object (referenced by their ObjectId).
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    // The title of the object.
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 100,
    },
    // The category of the object.
    category: {
        type: String,
        required: true,
        enum: ['books', 'electronics', 'fashion', 'games', 'sports', 'music', 'other'],
    },
    // The description of the object.
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 1000,
    },
    // The starting price of the object.
    startingPrice: {
        type: Number,
        required: true,
        min: 0,
    },
    // The current price of the object (updated dynamically during auctions).
    currentPrice: {
        type: Number,
        default: null,
        min: 0,
    },
    // The end date and time of the auction.
    endDate: {
        type: Date,
        required: true,
    },
    // The `User` who is currently the highest bidder (referenced by their ObjectId).
    buyer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    // A boolean indicating whether the object has been sold or not.
    sold: {
        type: Boolean,
        default: false,
    },
    // An array of bids made on the object.
    bids: [{
        // The `User` who made the bid (referenced by their ObjectId).
        bidder: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        // The amount of the bid.
        amount: {
            type: Number,
            required: true,
            min: 0,
        },
        // The time the bid was made.
        timestamp: {
            type: Date,
            required: true,
        },
    }],
    // The filename of the image associated with the object.
    image: {
        type: String,
        required: true,
    }
}, { timestamps: true });


module.exports = mongoose.model('Object', objectSchema);
