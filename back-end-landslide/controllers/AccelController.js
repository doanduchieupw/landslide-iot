const Accel = require('../models/Accel');

const AccelController = {
    getData: async(req, res) => {
        try {
            const accelData = await Accel.find().sort({ _id: -1}).limit(10);
            
            return res.status(200).json(accelData.reverse());
        } catch (err) {
            return res.status(500).json({err})
        }
    },

}

module.exports = AccelController;