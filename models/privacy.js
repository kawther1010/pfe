const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PrivacySchema = new Schema({
    // Privacy Policy
    privacyPolicy: {
        type: String,
        required: false,
        minlength: 3,
        maxlength: 1000,
    },

    // Information We Collect
    informationWeCollect: {
        type: String,
        required: false,
        minlength: 3,
        maxlength: 1000,
    },
    
    // How We Use Your Information
    howWeUseYourInformation: {
        type: String,
        required: false,
        minlength: 3,
        maxlength: 1000,
    },

    // Sharing Your Information
    sharingYourInformation: {
        type: String,
        required: false,
        minlength: 3,
        maxlength: 1000,
    },

    // Your Choices
    yourChoices: {
        type: String,
        required: false,
        minlength: 3,
        maxlength: 1000,
    },

    // Changes to this Policy
    changeToThisPolicy: {
        type: String,
        required: false,
        minlength: 3,
        maxlength: 1000,
    },
}, { timestamps: true });


module.exports = mongoose.model('Privacy', PrivacySchema);
