const Sensor = require('../models/Sensor');

const SensorController = {
    getData: async(req, res) => {
        try {
            const user = await Sensor.find().sort({ _id: -1 }).limit(10);
            return res.status(200).json(user)
        } catch (err) {
            return res.status(500).json({err})
        }
    },

}

module.exports = SensorController;