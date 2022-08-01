import { useState, useEffect, memo } from 'react';
import { Gauge } from '@ant-design/plots';

const HumiGauge = ({ value }) => {
    const [valueHumi, setValueHumi] = useState(0);
    useEffect(() => {
        setValueHumi((parseFloat(value[1])/100));
    }, [value[1]]);
    const config = {
        percent: valueHumi,
        width: 150,
        padding: [0, 5],
        range: {
            color: '#30BF78',
        },
        indicator: {
            pointer: {
                style: {
                    stroke: '#D0D0D0',
                },
            },
            pin: {
                style: {
                    stroke: '#D0D0D0',
                },
            },
        },
        axis: {
            label: {
                formatter(v) {
                    return Number(v) * 100;
                },
            },
            subTickLine: {
                count: 3,
            },
        },
        statistic: {
            content: {
                formatter: ({ percent }) =>
                    `Humi: ${(percent * 100).toFixed(0)}%`,
                style: {
                    color: 'rgba(0,0,0,0.95)',
                    fontSize: 12,
                },
                offsetY: 6,
            },
        },
        animation: {
            update: {
                animation: 'wave-in', // Effects of the first animation
                duration: 1000, // Duration of the first animation
            },
        },
    };
    return <Gauge {...config} />;
};

export default memo(HumiGauge);
