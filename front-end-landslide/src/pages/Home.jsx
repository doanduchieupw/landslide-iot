import { useEffect, useState } from 'react';
import { Card, WeatherCard } from '../components';
import * as mqtt from 'mqtt';
const data = [12, 13, 14];
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
const topic = 'acc';

const Home = () => {
    const [acc, setAcc] = useState([0, 0, 0]);
    const [gyro, setGyro] = useState([0, 0, 0]);
    const [temp, setTemp] = useState([0, 0, 0]);
    const [rain, setRain] = useState([0]);
    useEffect(() => {
        client.on('message', async (topic, message) => {
            let data = JSON.parse(message.toString());
            if (topic === 'accelerometer') {
                setAcc([data.aX, data.aY, data.aZ]);
            }
            if (topic === 'gyroscope') {
                setGyro([data.gX, data.gY, data.gZ]);
            }
            if (topic === 'temp') {
                setTemp([data.t, data.h, data.m]);
            }
            if (topic === 'rain') {
                setRain([data.rain]);
            }
        });

        client.on('connect', () => {
            console.log('Get data from Home-page');
            client.subscribe('accelerometer');
            client.subscribe('gyroscope');
            client.subscribe('temp');
            client.subscribe('rain');
        });
        return () => {
            client.on('close', () => {
                console.log('Disconnected');
            });
        };
    }, []);
    return (
        <div className='w-full flex justify-around gap-x-5 flex-wrap mt-3'>
            <Card type='acc' value={acc} />
            <Card type='gyro' value={gyro} />
            <Card type='temp' value={temp} />
            <Card type='rain' value={rain} />
            <WeatherCard />
        </div>
    );
};

export default Home;
