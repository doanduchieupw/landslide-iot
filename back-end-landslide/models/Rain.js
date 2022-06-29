const mongoose = require('mongoose');

const rainSchema = new mongoose.Schema(
    {
        rain: { type: Number },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Rain', rainSchema);
