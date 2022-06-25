import { useEffect, useState } from 'react';
import { Card, WeatherCard } from '../components';
const data = [12, 13, 14];
const Home = () => {
    return (
        <div className='w-full flex justify-around gap-x-5 flex-wrap mt-3'>
            <Card type='acc' value={data} />
            <Card type='gyro' value={data} />
            <Card type='temp' value={data} />
            <Card type='rain' value={data} />
            <WeatherCard />
        </div>
    );
};

export default Home;
