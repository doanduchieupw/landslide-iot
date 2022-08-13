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
                        firstDocument: { $first: '$$ROOT' },
                    },
                },
                { $sort: { "firstDocument.createdAt": 1 } },
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
                        firstDocument: { $first: '$$ROOT' }
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
            const tempData = await Temp.aggregate([
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
                        _id: { $month: '$createdAt' },
                        temp: { $avg: '$temp' },
                        humi: { $avg: '$humi' },
                        mois: { $avg: '$mois' },
                        firstDocument: { $first: '$$ROOT' }
                        
                    },
                },
                // {
                //     $group: {
                //         _id: { $month: '$data.createdAt' },
                //         temp: { $avg: '$data.temp' },
                //         humi: { $avg: '$data.humi' },
                //         mois: { $avg: '$data.mois' },
                //         firstDocument: { $first: '$$ROOT' }
                //     },
                // },
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
                { $sort: { "data.createdAt": 1 } },
            ]);

            return res.status(200).json(tempData);
        } catch (err) {
            return res.status(500).json({ err });
        }
    },
    getData: async (req, res) => {
        try {
            const tempData = await Temp.find().sort({ _id: -1}).limit(20);
            return res.status(200).json(tempData.reverse());
        } catch (err) {
            return res.status(500).json({ err });
        }
    },
}; 

module.exports = TempController;
