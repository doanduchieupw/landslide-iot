const mongoose = require('mongoose');

const accelSchema = new mongoose.Schema(
    {
        accX: { type: Number },
        accY: { type: Number },
        accZ: { type: Number },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Accel', accelSchema);
