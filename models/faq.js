const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var faqSchema = new Schema({
    question: {
        type: String,
        required: true,
        max: 255,
        min: 3
    },
    response: {
        type: String,
        required: true,
        max: 255,
        min: 3
    }
}, { timestamps: true });

const Faq = mongoose.model('Faq', faqSchema)

module.exports = Faq;
