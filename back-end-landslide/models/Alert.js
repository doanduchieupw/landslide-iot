const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
    type: { type: String },
    message: { type: String },
    data: { type: Object },
    date: { type: Date },
});

module.exports = mongoose.model('Alert', alertSchema);
