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

import { getRainDataByDay, getRainDataByMonth } from '../../utils/APIRoutes';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Rain',
        },
    },
};

const BarChart = () => {
    const [barChartData, setBarChartData] = useState();
    const [rangeBarChart, setRangeBarChart] = useState('day');

    const convertBarChartData = (data) => {
        const dataConfig = {
            labels: data?.map((item) => item?._id),
            datasets: [
                {
                    label: 'Rain (mm)',
                    data: data?.map((item) => item?.first?.rain),
                    backgroundColor: 'rgba(50, 132, 255, 0.753)',
                    borderColor: 'rgba(15, 27, 202, 0.719)',
                    borderWidth: 2
                },
            ],
        };
        console.log(dataConfig?.datasets[0]?.data, dataConfig?.labels);
        return dataConfig;
    };
    useEffect(() => {
        const apiRain = rangeBarChart === 'day' ? getRainDataByDay : getRainDataByMonth
        console.log("🚀 ~ file: BarChart.jsx ~ line 60 ~ useEffect ~ apiRain", apiRain)
        axios
            .get(apiRain)
            .then((res) => {
                const data = res?.data;
                console.log("🚀 ~ file: BarChart.jsx ~ line 59 ~ .then ~ data", data)
                const dataRain = convertBarChartData(data);
                setBarChartData(dataRain);
            })
            .catch((err) => console.log(err))
            .finally(() => {});
    }, [rangeBarChart]);
    return <>
    <button onClick={() => setRangeBarChart('day')}>Day</button>
    <button onClick={() => setRangeBarChart('month')}>Month</button>
    {barChartData && <Bar options={options} data={barChartData} />}
    </>;
};

export default BarChart;
