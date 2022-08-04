import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/plots';
import moment from 'moment';

const DemoLine = () => {
    const [data, setData] = useState([]);
    console.log('🚀 ~ file: AccelChart.jsx ~ line 6 ~ DemoLine ~ data', data);

    useEffect(() => {
        asyncFetch();
    }, []);

    const asyncFetch = () => {
        fetch('http://localhost:4000/api/accel/data')
            .then((response) => response.json())
            .then((json) => {
                let accel = json?.map((item) => {
                    return [
                        {
                            time: moment(item?.createdAt)
                                .local()
                                .format('HH:mm:ss'),
                            value: item?.accX,
                            name: 'accX',
                        },
                        {
                            time: moment(item?.createdAt)
                                .local()
                                .format('HH:mm:ss'),
                            value: item?.accY,
                            name: 'accY',
                        },
                        {
                            time: moment(item?.createdAt)
                                .local()
                                .format('HH:mm:ss'),
                            value: item?.accZ,
                            name: 'accZ',
                        },
                    ];
                });
                console.log(
                    '🚀 ~ file: AccelChart.jsx ~ line 39 ~ accel ~ accel',
                    accel
                );
                let newAccel = accel.flat();
                console.log(
                    '🚀 ~ file: AccelChart.jsx ~ line 40 ~ .then ~ newAccel',
                    newAccel
                );
                setData(newAccel);
            })
            .catch((error) => {
                console.log('fetch data failed', error);
            });
    };
    const config = {
        data,
        xField: 'time',
        yField: 'value',
        seriesField: 'name',
        // xAxis: {
        //     type: 'time',
        // },
        yAxis: {
            label: {
                // 数值格式化为千分位
                formatter: (v) =>
                    `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
            },
        },
        smooth: true,
        animation: {
            appear: {
                animation: 'path-in',
                duration: 5000,
            },
        },
        // slider: {
        //     start: 0.1,
        //     end: 0.5,
        // },
    };
    return <>{config && <Line {...config} />}</>;
};
export default DemoLine;
