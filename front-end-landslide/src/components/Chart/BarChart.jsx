import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import moment from 'moment';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';

import {
    getRainDataByDay,
    getRainDataByMonth,
    getRainDataByYear,
    host,
} from '../../utils/APIRoutes';
import { useSelector } from 'react-redux';
import { DatePicker } from '../../assets/icon';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const BarChart = () => {
    const { darkMode } = useSelector((state) => state.global);

    const [barChartData, setBarChartData] = useState();
    const [rangeBarChart, setRangeBarChart] = useState('day');
    const [date, setDate] = useState(new Date());

    const options = {
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
                text: 'Rain',
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
                title: {
                    display: true,
                    color: darkMode ? '#fff' : '#888',
                    text:
                        rangeBarChart === 'day'
                            ? `${moment().format('MMM Do, YYYY')}`
                            : rangeBarChart === 'month'
                            ? `${moment().format('MMMM')}`
                            : `${moment().format('YYYY')}`,
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
                title: {
                    display: true,
                    text: 'Rain (mm)',
                    color: darkMode ? '#fff' : '#888',
                },
            },
        },
    };

    const convertBarChartData = (data) => {
        const dataConfig = {
            labels:
                rangeBarChart === 'day'
                    ? data?.map((item) =>
                          moment(item?.data.createdAt).local().format('HH')
                      )
                    : data?.map((item) => item?._id),
            datasets: [
                {
                    label: 'Rain (mm)',
                    data: data?.map((item) => item?.data?.rain || item?.data),
                    backgroundColor: 'rgba(50, 132, 255, 0.753)',
                    borderColor: 'rgba(15, 27, 202, 0.719)',
                    borderWidth: 2,
                },
            ],
        };
        console.log(dataConfig?.datasets[0]?.data, dataConfig?.labels);
        return dataConfig;
    };
    useEffect(() => {
        const apiRain =
            rangeBarChart === 'day'
                ? getRainDataByDay
                : rangeBarChart === 'month'
                ? getRainDataByMonth
                : getRainDataByYear;

        axios
            .get(apiRain)
            .then((res) => {
                const data = res?.data;
                const dataRain = convertBarChartData(data);
                setBarChartData(dataRain);
            })
            .catch((err) => console.log(err))
            .finally(() => {});
    }, [rangeBarChart]);
    useEffect(() => {
        console.log(date);
        const startDay = moment(date[0]).local().format();
        const endDay = moment(date[1]).local().format();
        axios
            .get(`${host}/api/rain/data-by-range/${startDay}&${endDay}`)
            .then((res) => {
                const data = res?.data;
                const dataRain = convertBarChartData(data);
                setBarChartData(dataRain);
            })
            .catch((err) => console.log(err))
            .finally(() => {});
    }, [date]);
    return (
        <>
            <div className='flex flex-col gap-x-2 relative'>
                <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                    <DatePicker className='w-5 h-5 text-gray-500 dark:text-gray-400' />
                </div>
                <Flatpickr
                    datepicker
                    value={date}
                    className='w-48 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='Select date'
                    options={{
                        mode: 'range',
                        maxDate: 'today',
                        dateFormat: 'd-m-Y',
                    }}
                    onChange={(dateSelect) => setDate(dateSelect)}
                />
            </div>
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
                    className='hover:opacity-50'
                    onClick={() => setRangeBarChart('year')}
                >
                    Year
                </button>
            </div>
            {barChartData && <Bar options={options} data={barChartData} />}
        </>
    );
};

export default BarChart;
