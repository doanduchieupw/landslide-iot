const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const mqtt = require('mqtt');
const Accel = require('./models/Accel');
const Gyro = require('./models/Gyro');
const Temp = require('./models/Temp');
const Rain = require('./models/Rain');

const route = require('./routes');

dotenv.config();
const app = express();

//Connect to database
mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to database successfully !!!');
    })
    .catch((err) => console.log(err));

// Cookie middleware
app.use(cookieParser());
app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
);
app.use(express.json());

//Init router
route(app);

app.listen(process.env.PORT, () => {
    console.log('Server is running at PORT: ', process.env.PORT);
});

//Broker config
const brokerConfig = {
    clientId: 'landslide-backend-mongoDB',
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD,
};
const client = mqtt.connect(process.env.MQTT_BROKER_URL, brokerConfig);

client.on('message', async (topic, message) => {
    let data = JSON.parse(message.toString());
    if (topic === 'accelerometer') {
        await Accel.create({
            accX: data.aX,
            accY: data.aY,
            accZ: data.aZ,
        });
    } 
    if (topic === 'gyroscope') {
        await Gyro.create({
            gyX: data.gX,
            gyY: data.gY,
            gyZ: data.gZ,
        })
    }
    if (topic === 'temp') {
        await Temp.create({
            temp: data.t,
            humi: data.h,
            mois: data.m,
        })
    }
    if (topic === 'rain') {
        await Rain.create({
            rain: data.r,
        })
    }
    console.log(data);
});

client.on('connect', () => {
    console.log('Connect from Back-end');
    client.subscribe('accelerometer');
    client.subscribe('gyroscope');
    client.subscribe('temp');
    client.subscribe('rain');
});
