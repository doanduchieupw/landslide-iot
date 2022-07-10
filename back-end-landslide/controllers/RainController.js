const Rain = require('../models/Rain');
const moment = require('moment');

const RainController = {
    getDataByDay: async (req, res) => {
        const today = moment().startOf('day');
        try {
            const rainData = await Rain.aggregate([
                {
                    $match: {
                        createdAt: {
                            $gte: today.toDate(),
                            $lte: moment(today).endOf('day').toDate(),
                        },
                    },
                },
                {
                    $group: {
                        _id: { $hour: '$createdAt' },
                        data: { $first: '$$ROOT' },
                    },
                },
                { $sort: { _id: 1 } },
            ]);

            return res.status(200).json(rainData);
        } catch (err) {
            return res.status(500).json({ err });
        }
    },
    getDataByMonth: async (req, res) => {
        const today = moment().startOf('month');
        try {
            const rainData = await Rain.aggregate([
                {
                    $match: {
                        createdAt: {
                            $gte: today.toDate(),
                            $lte: moment(today).endOf('month').toDate(),
                        },
                    },
                },
                {
                    $group: {
                        _id: { $dayOfMonth: '$createdAt' },
                        data: { $last: '$$ROOT' },
                    },
                },
                { $sort: { _id: 1 } },
            ]);

            return res.status(200).json(rainData);
        } catch (err) {
            return res.status(500).json({ err });
        }
    },
    getDataByYear: async (req, res) => {
        const today = moment().startOf('year');
        try {
            const rainData = await Rain.aggregate([
                {
                    $match: {
                        createdAt: {
                            $gte: today.toDate(),
                            $lte: moment(today).endOf('year').toDate(),
                        },
                    },
                },
                {
                    $group: {
                        _id: { $dayOfYear: '$createdAt' },
                        data: { $last: '$$ROOT' },
                    },
                },
                {
                    $group: {
                        _id: { $month: '$data.createdAt' },
                        data: { $avg: '$$' },
                    },
                },
                { $sort: { _id: 1 } },
            ]);

            return res.status(200).json(rainData);
        } catch (err) {
            return res.status(500).json({ err });
        }
    }
};

module.exports = RainController;
