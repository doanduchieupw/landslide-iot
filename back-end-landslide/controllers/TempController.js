const Temp = require('../models/Temp');
const moment = require('moment');

const TempController = {
    getDataByDay: async (req, res) => {
        const today = moment().startOf('day');
        try {
            const tempData = await Temp.aggregate([
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
                        temp: { $avg: '$temp' },
                        humi: { $avg: '$humi' },
                        mois: { $avg: '$mois' },
                    },
                },
                { $sort: { _id: 1 } },
            ]);

            return res.status(200).json(tempData);
        } catch (err) {
            return res.status(500).json({ err });
        }
    },
    getDataByMonth: async (req, res) => {
        const today = moment().startOf('month');
        try {
            const tempData = await Temp.aggregate([
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
                        temp: { $avg: '$temp' },
                        humi: { $avg: '$humi' },
                        mois: { $avg: '$mois' },
                    },
                },
                { $sort: { _id: 1 } },
            ]);

            return res.status(200).json(tempData);
        } catch (err) {
            return res.status(500).json({ err });
        }
    },
    getDataByYear: async (req, res) => {
        const today = moment().startOf('year');
        try {
            const tempData = await Rain.aggregate([
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
                        data: { $avg: '$data.rain' },
                    },
                },
                { $sort: { _id: 1 } },
            ]);
            return res.status(200).json(tempData);
        } catch (err) {
            return res.status(500).json({ err });
        }
    },
    getDataByRange: async (req, res) => {
        const { startDay, endDay } = req.params;

        try {
            const tempData = await Rain.aggregate([
                {
                    $match: {
                        createdAt: {
                            $gte: moment(startDay).toDate(),
                            $lte: moment(endDay).toDate(),
                        },
                    },
                },
                {
                    $group: {
                        _id: { $substr: ['$createdAt', 0, 10] },
                        data: { $last: '$$ROOT' },
                    },
                },
                { $sort: { _id: 1 } },
            ]);
            console.log('start', moment(startDay).toDate());
            console.log('end', moment(endDay).toDate());

            return res.status(200).json(tempData);
        } catch (err) {
            return res.status(500).json({ err });
        }
    },
};

module.exports = TempController;
