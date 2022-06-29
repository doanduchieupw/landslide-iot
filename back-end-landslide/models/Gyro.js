const mongoose = require('mongoose');

const gyroSchema = new mongoose.Schema(
    {
        gyX: { type: Number },
        gyY: { type: Number },
        gyZ: { type: Number },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Gyro', gyroSchema);
