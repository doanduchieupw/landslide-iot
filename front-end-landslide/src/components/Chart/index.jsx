import React, { useEffect, useState, useCallback } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { useSelector } from 'react-redux';
import * as mqtt from 'mqtt';

import Loading from '../../assets/loading.gif';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

//Option chart
const rangeOfChart = 40;

// MQTT config
const brokerConfig = {
    clientId: 'hieu-graph',
    username: 'landslide',
    password: 'oYPSNMspLlNXX5o8',
};
const client = mqtt.connect(
    'wss://landslide.cloud.shiftr.io:443',
    brokerConfig
);
const topic = 'getData';
let result = {
    labels: [],
    x: [],
    y: [],
    z: [],
};

// Component Chart
const Chart = ({ type }) => {
    const { darkMode } = useSelector((state) => state.global);
    const [indexOfChart, setIndexOfChart] = useState(0);

    const options = {
        animation: false,
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: darkMode ? '#fff' : '#888',
                },
            },
            title: {
                display: true,
                text:
                    type === 'acc' ? 'Accelerometer chart' : 'Gyroscope chart',
                color: darkMode ? '#fff' : '#888',
            },
        },

        scales: {
            x: {
                ticks: {
                    color: darkMode ? '#fff' : '#888',
                },
                grid: {
                    color: darkMode ? '#9c9c9c' : '#888',
                    borderColor: darkMode ? '#9c9c9c' : '#888',
                },
                min:
                    indexOfChart <= rangeOfChart
                        ? 0
                        : indexOfChart - rangeOfChart,
                max: indexOfChart <= rangeOfChart ? rangeOfChart : indexOfChart,
                beginAtZero: false,
            },
            y: {
                ticks: {
                    color: darkMode ? '#fff' : '#888',
                },
                grid: {
                    color: darkMode ? '#9c9c9c' : '#888',
                    borderColor: darkMode ? '#9c9c9c' : '#888',
                },
            },
        },
    };

    const [dataChart, setDataChart] = useState();

    const convertDataChart = (data) => {
        let date = new Date()
            .toTimeString()
            .replace(/.*(\d{2}:\d{2}:\d{4}).*/, '$1');
        result.labels.push(date);
        result.x.push(type === 'acc' ? data.accX : data.gyX);
        result.y.push(type === 'acc' ? data.accY : data.gyY);
        result.z.push(type === 'acc' ? data.accZ : data.gyZ);

        const dataConfig = {
            labels: result.labels,
            datasets: [
                {
                    label: type === 'acc' ? 'accX' : 'gyX',
                    data: result.x,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
                {
                    label: type === 'acc' ? 'accY' : 'gyY',
                    data: result.y,
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                },
                {
                    label: type === 'acc' ? 'accZ' : 'gyZ',
                    data: result.z,
                    borderColor: 'rgb(31, 196, 80)',
                    backgroundColor: 'rgba(33, 168, 51, 0.5)',
                },
            ],
        };

        return dataConfig;
    };

    const getDataChart = useCallback(() => {
        axios
            .get('http://localhost:4000/api/sensor/data')
            .then((res) => {
                const data = res?.data;
                const x = convertDataChart(data);
                setDataChart(x);
            })
            .catch((err) => console.log(err))
            .finally(() => {});
    }, []);

    // useEffect(() => {
    //     let timeCallApi = setInterval(() => {
    //         getDataChart();
    //     }, 2000);
    //     return () => clearInterval(timeCallApi);
    // }, []);

    useEffect(() => {
        client.on('message', async (topic, message) => {
            let data = JSON.parse(message.toString());
            let data_convert = convertDataChart(data);
            setDataChart(data_convert);
            console.log(
                '🚀 ~ file: index.jsx ~ line 167 ~ client.on ~ data_convert',
                data_convert
            );
            setIndexOfChart((prev) => prev + 1);
        });

        client.on('connect', () => {
            console.log('Get data');
            client.subscribe(topic);
        });
        return () => {
            client.on('close', () => {
                console.log('Disconnected');
            });
            result = {
                labels: [],
                x: [],
                y: [],
                z: [],
            };
        };
    }, []);

    useEffect(() => {
        console.log(dataChart);
    }, [indexOfChart]);

    return (
        <>
            {!dataChart && (
                <div className='w-full h-[100vh] flex justify-center items-center'>
                    <img src={Loading} alt='loading' />
                </div>
            )}
            {dataChart && <Line options={options} data={dataChart} />}
        </>
    );
};

export default Chart;
