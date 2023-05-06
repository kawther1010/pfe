const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    googleId: {
        type: String,
        required: false
    },
    firstName: {
        type: String,
        required: true,
        max: 255,
        min: 3
    },
    lastName: {
        type: String,
        required: true,
        max: 255,
        min: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 255,
        min: 6,
        validate: {
            validator: function (v) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    bio: {
        type: String,
        default: "",
        trim: true
    },
    profilePicture: {
        type: String,
        default: "default-profile-picture.png",
        trim: true
    },
    emailConfirmed: {
        type: Boolean,
        default: false
    },
    passwordResetToken: {
        type: String,
        default: undefined
    },
    passwordResetExpires: {
        type: Date,
        default: undefined
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema)

module.exports = User
