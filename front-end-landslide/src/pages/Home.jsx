import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { Card } from '../components';

const Home = () => {
    const [time, setTime] = useState(DateTime.local());
    useEffect(() => {
        const timeId = setInterval(() => {
            setTime(DateTime.local);
        }, 1000);
        return () => clearInterval(timeId);
    }, []);
    useEffect(() => {
        console.log(time);
    }, [time]);
    return (
        <div className='w-full flex justify-around gap-x-5 flex-wrap mt-3'>
            <Card />
            <Card />
            <Card />
            <Card />
            <span className=''>{`${time.c.hour}:${time.c.minute}:${time.c.second}`}</span>
        </div>
    );
};

export default Home;
