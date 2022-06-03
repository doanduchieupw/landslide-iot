const mongoose = require('mongoose');

const sensorSchema = new mongoose.Schema(
    {
        accX: { type: Number, required: true },
        accY: { type: Number, required: true },
        accZ: { type: Number, required: true },
        gyX: { type: Number, required: true },
        gyY: { type: Number, required: true },
        gyZ: { type: Number, required: true },
        temp: { type: Number, required: true },
        humi: { type: Number, required: true },
        mois: { type: Number, required: true },
        rain: { type: Number, required: true },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Sensor', sensorSchema);
