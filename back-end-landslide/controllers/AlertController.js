const Alert = require('../models/Alert');

const AccelController = {
    getData: async(req, res) => {
        try {
            const warningData = await Alert.find().sort({ _id: 1}).limit(10);
            return res.status(200).json(warningData);
        } catch (err) {
            return res.status(500).json({err})
        }
    },

}

module.exports = AccelController;