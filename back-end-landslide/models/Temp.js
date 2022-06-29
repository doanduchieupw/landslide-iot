const mongoose = require('mongoose');

const tempSchema = new mongoose.Schema(
    {
        temp: { type: Number },
        humi: { type: Number },
        mois: { type: Number },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Temp', tempSchema);
