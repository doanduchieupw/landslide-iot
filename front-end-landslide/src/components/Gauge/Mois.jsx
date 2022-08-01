import { useState, useEffect, memo } from 'react';
import { Liquid } from '@ant-design/plots';

const MoisGauge = ({ value }) => {
    const [valueMois, setValueMois] = useState(0);
    useEffect(() => {
        setValueMois(parseFloat(value[2])/100);
    }, [value[2]]);
    const config = {
        percent: valueMois,
        width: 150,
        outline: {
            border: 4,
            distance: 5,
        },
        wave: {
            length: 128,
        },
        statistic: {
            content: {
                formatter: ({ percent }) =>
                    `Mois: ${(percent * 100).toFixed(0)}%`,

                style: {
                    fontSize: 13,
                    fill: '#000000',
                    opacity: 1,
                    lineWidth: 1,
                    shadowColor: '#000',
                    shadowBlur: 10,
                },
                offsetY: 2,
            },
        },
        pattern: {
            type: 'dot',
            cfg: {
                size: 30,
            },
        },
    };
    return <Liquid {...config} />;
};

export default memo(MoisGauge);
