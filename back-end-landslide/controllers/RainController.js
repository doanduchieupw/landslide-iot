const Rain = require('../models/Rain');

const RainController = {
    getDataByDay: async(req, res) => {
        const present = Date.now();
        
        // try {
        //     const rainData = await Rain.find({ createdAt: {} }).sort({ _id: -1}).limit(20);
            
        //     return res.status(200).json(rainData.reverse());
        // } catch (err) {
        //     return res.status(500).json({err})
        // }
    },

}

module.exports = RainController;