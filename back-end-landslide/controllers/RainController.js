const Rain = require('../models/Rain');
const moment = require('moment');

const RainController = {
    getDataByDay: async (req, res) => {
        const present = moment().format();
        const today = moment().startOf('day');
        // const rainData = await Rain.find({
        //     createdAt: {
        //       $gte: today.toDate(),
        //       $lte: moment(today).endOf('day').toDate()
        //     }
        // })
        const rainData = await Rain.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: today.toDate(),
                        $lte: moment(today).endOf('day').toDate(),
                    },
                },
            },
            { $sort: { createdAt: 1 } },
            {
                $group: {
                    _id: { $hour: "$createdAt" },
                    first: { $first: "$$ROOT" },
                },
            },
        ]);

        console.log(
            present,
            today,
            today.toDate(),
            moment(today).endOf('day').toDate()
        );
        return res.status(200).json(rainData);
        // try {
        //     const rainData = await Rain.find({ createdAt: {} }).sort({ _id: -1}).limit(20);

        //     return res.status(200).json(rainData.reverse());
        // } catch (err) {
        //     return res.status(500).json({err})
        // }
    },
};

module.exports = RainController;
