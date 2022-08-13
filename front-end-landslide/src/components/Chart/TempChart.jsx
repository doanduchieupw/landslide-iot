import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { DualAxes } from '@ant-design/plots';
import axios from 'axios';
import moment from 'moment';

import {
    getTempData,
    getTempDataByDay,
    getTempDataByMonth,
    getTempDataByYear,
    host,
} from '../../utils/APIRoutes';
const uvData = [
    {
        time: '2019-03',
        value: 35,
    },
    {
        time: '2019-04',
        value: 90,
    },
    {
        time: '2019-05',
        value: 30,
    },
    {
        time: '2019-06',
        value: 45,
    },
    {
        time: '2019-07',
        value: 47,
    },
];
const transformData = [
    {
        time: '2019-03',
        count: 800,
        name: 'a',
    },
    {
        time: '2019-04',
        count: 600,
        name: 'a',
    },
    {
        time: '2019-05',
        count: 400,
        name: 'a',
    },
    {
        time: '2019-06',
        count: 380,
        name: 'a',
    },
    {
        time: '2019-07',
        count: 220,
        name: 'a',
    },
    {
        time: '2019-03',
        count: 750,
        name: 'b',
    },
    {
        time: '2019-04',
        count: 650,
        name: 'b',
    },
    {
        time: '2019-05',
        count: 450,
        name: 'b',
    },
    {
        time: '2019-06',
        count: 400,
        name: 'b',
    },
    {
        time: '2019-07',
        count: 320,
        name: 'b',
    },
    {
        time: '2019-03',
        count: 900,
        name: 'c',
    },
    {
        time: '2019-04',
        count: 600,
        name: 'c',
    },
    {
        time: '2019-05',
        count: 450,
        name: 'c',
    },
    {
        time: '2019-06',
        count: 300,
        name: 'c',
    },
    {
        time: '2019-07',
        count: 200,
        name: 'c',
    },
];

const TempHumiChart = () => {
    // const { darkMode } = useSelector((state) => state.global);
    const [barChartData, setBarChartData] = useState();
    const [rangeBarChart, setRangeBarChart] = useState('day');
    const [config, setConfig] = useState({
        data: [uvData, transformData],
        xField: 'time',
        yField: ['value', 'count'],
        geometryOptions: [
            {
                geometry: 'column',
                columnWidthRatio: 0.4,
            },
            {
                geometry: 'line',
                seriesField: 'name',
            },
        ],
    });
    const convertBarChartData = (data) => {
        let temp = data?.map((item) => {
            if(rangeBarChart === 'last-data') {
                return {
                    time: moment(item?.createdAt)
                    .local()
                    .format('hh:mm:ss'),
                value: item?.temp,
                }
            }
            if(rangeBarChart === 'month') {
                return {
                    time: moment(item?.firstDocument?.createdAt)
                    .local()
                    .format('MMM Do'),
                value: item?.temp,
                }
            }
            if(rangeBarChart === 'year') {
                return {
                    time: moment(item?.firstDocument?.createdAt)
                    .local()
                    .format('MMM'),
                value: item?.temp,
                }
            }
            return {
                time: moment(item?.firstDocument?.createdAt)
                    .local()
                    .format('HH') + 'h',
                value: item?.temp,
            };
        });
        console.log("🚀 ~ file: TempChart.jsx ~ line 142 ~ temp ~ temp", temp)

        let humiAndMois = data?.map((item) => {
            if(rangeBarChart === 'last-data') {
                return [
                {
                    time: moment(item?.createdAt)
                        .local()
                        .format('hh:mm:ss'),
                    valueHumi: item?.humi,
                    name: 'humi',
                },
                {
                    time: moment(item?.createdAt)
                        .local()
                        .format('hh:mm:ss'),
                    valueHumi: item?.mois,
                    name: 'mois',
                },
            ]
            }
            if(rangeBarChart === 'month') {
                return [
                {
                    time: moment(item?.firstDocument?.createdAt)
                        .local()
                        .format('MMM Do'),
                    valueHumi: item?.humi,
                    name: 'humi',
                },
                {
                    time: moment(item?.firstDocument?.createdAt)
                        .local()
                        .format('MMM Do'),
                    valueHumi: item?.mois,
                    name: 'mois',
                },
            ]
            }
            if(rangeBarChart === 'year') {
                return [
                {
                    time: moment(item?.firstDocument?.createdAt)
                        .local()
                        .format('MMM'),
                    valueHumi: item?.humi,
                    name: 'humi',
                },
                {
                    time: moment(item?.firstDocument?.createdAt)
                        .local()
                        .format('MMM'),
                    valueHumi: item?.mois,
                    name: 'mois',
                },
            ]
            }
            return [
                {
                    time: moment(item?.firstDocument?.createdAt)
                        .local()
                        .format('HH') + 'h',
                    valueHumi: item?.humi,
                    name: 'humi',
                },
                {
                    time: moment(item?.firstDocument?.createdAt)
                        .local()
                        .format('HH') + 'h',
                    valueHumi: item?.mois,
                    name: 'mois',
                },
            ];
        });
        console.log("🚀 ~ file: TempChart.jsx ~ line 162 ~ humiAndMois ~ humiAndMois", humiAndMois)

        let newHumiAndMois = humiAndMois.flat();

        setConfig({
            data: [temp, newHumiAndMois],
            xField: 'time',
            yField: ['value', 'valueHumi'],
            meta: {
                value: {
                    min: 0,
                    max: 50,
                },
                valueHumi: {
                    min: 0,
                    max: 100,
                },
            },
            geometryOptions: [
                {
                    geometry: 'column',
                    columnWidthRatio: 0.4,
                },
                {
                    geometry: 'line',
                    seriesField: 'name',
                },
            ],
        });
    };
    useEffect(() => {
        const apiRain =
            rangeBarChart === 'day'
                ? getTempDataByDay
                : rangeBarChart === 'month'
                ? getTempDataByMonth
                : rangeBarChart === 'year'
                ? getTempDataByYear
                : getTempData;

        axios
            .get(apiRain)
            .then((res) => {
                const data = res?.data;
                const dataTemp = convertBarChartData(data);
                setBarChartData(dataTemp);
            })
            .catch((err) => console.log(err))
            .finally(() => {});
    }, [rangeBarChart]);

    return (
        <>
            <div
                className={`flex justify-end gap-x-2 text-md text-royal-blue dark:text-white`}
            >
                <button
                    className='hover:opacity-50 border-r border-gray-500 pr-2'
                    onClick={() => setRangeBarChart('day')}
                >
                    Day
                </button>

                <button
                    className='hover:opacity-50 border-r border-gray-500 pr-2'
                    onClick={() => setRangeBarChart('month')}
                >
                    Month
                </button>
                <button
                    className='hover:opacity-50 border-r border-gray-500 pr-2'
                    onClick={() => setRangeBarChart('year')}
                >
                    Year
                </button>
                <button
                    className='hover:opacity-50'
                    onClick={() => setRangeBarChart('last-data')}
                >
                    Recently
                </button>
            </div>
            {config && <DualAxes {...config} />}
        </>
    );
};

export default TempHumiChart;
