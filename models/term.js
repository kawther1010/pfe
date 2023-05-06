const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var termSchema = new Schema({
    rule: {
        type: String,
        required: true,
        max: 255,
        min: 3
    },
}, { timestamps: true });

const Term = mongoose.model('Term', termSchema);

module.exports = Term;