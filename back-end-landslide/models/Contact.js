const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
    {
        members: {
            type: Array,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Contact', contactSchema);
