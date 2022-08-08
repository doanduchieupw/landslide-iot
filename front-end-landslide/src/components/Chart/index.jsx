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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Loading from '../../assets/loading.gif';
import { DateTime } from 'luxon';

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
const rangeOfChart = 50;

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
        elements: {
            line: {
                borderWidth: 2,
            },
        },
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
        let time = DateTime.local();
        let timeLabel = `${time.c.hour}:${time.c.minute}:${time.c.second}.${time.c.millisecond}`;

        result.labels.push(timeLabel);
        result.x.push(type === 'acc' ? data.aX : data.gX);
        result.y.push(type === 'acc' ? data.aY : data.gY);
        result.z.push(type === 'acc' ? data.aZ : data.gZ);

        const dataConfig = {
            labels: result.labels,
            datasets: [
                {
                    label: type === 'acc' ? 'accX' : 'gyX',
                    data: result.x,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    lineTension: 0.2,
                },
                {
                    label: type === 'acc' ? 'accY' : 'gyY',
                    data: result.y,
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    lineTension: 0.2,
                },
                {
                    label: type === 'acc' ? 'accZ' : 'gyZ',
                    data: result.z,
                    borderColor: 'rgb(31, 196, 80)',
                    backgroundColor: 'rgba(33, 168, 51, 0.5)',
                    lineTension: 0.2,
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
            console.log(
                '🚀 ~ file: index.jsx ~ line 170 ~ client.on ~ data',
                data
            );
            if (topic === 'warning') {
                toast.warn(data?.message, {
                    position: 'bottom-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            if (topic === 'accelerometer') {
                let data_convert = convertDataChart(data);

                setDataChart(data_convert);
                setIndexOfChart((prev) => prev + 1);
            }
        });

        client.on('connect', () => {
            client.subscribe('accelerometer');
            client.subscribe('warning');
        });
        return () => {
            client.on('close', () => {});
            result = {
                labels: [],
                x: [],
                y: [],
                z: [],
            };
        };
    }, []);

    return (
        <>
            {!dataChart && (
                <div className='w-full h-[100vh] flex justify-center items-center'>
                    <img src={Loading} alt='loading' />
                </div>
            )}
            {dataChart && <Line options={options} data={dataChart} />}
            <ToastContainer />
        </>
    );
};

export default Chart;
