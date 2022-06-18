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

const Chart = ({ type }) => {
    const { darkMode } = useSelector((state) => state.global);

    const options = {
        animation: {
            duration: 50,
                // easing: 'linear',
          
        },
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
        const result = {
            labels: [],
            x: [],
            y: [],
            z: [],
        };

        if (data.length > 0) {
            data.map((item) => {
                result.labels.push(item.createdAt.split('T')[1].split('.')[0]);
                result.x.push(type === 'acc' ? item.accX : item.gyX);
                result.y.push(type === 'acc' ? item.accY : item.gyY);
                result.z.push(type === 'acc' ? item.accZ : item.gyZ);
            });
        }

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

    useEffect(() => {
        let timeCallApi = setInterval(() => {
            getDataChart();
        }, 2000);
        return () => clearInterval(timeCallApi);
    }, []);

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
