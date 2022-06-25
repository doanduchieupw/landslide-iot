const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const mqtt = require('mqtt');
const Sensor = require('./models/Sensor');
const axios = require('axios');

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

// app.get('/api/weather', (req, res) => {
//     try {
//         axios
//             .get(
//                 'https://api.openweathermap.org/data/2.5/weather?q=hanoi&appid=3e8b33742b8bc73a3e884e2a3980eaa4'
//             )
//             .then((data) => {
//                 console.log(data);
//                 return res.status(200).send(data.data)})
//             .catch((err) => res.send(err));
//     } catch (err) {
//         console.error('GG', err);
//     }
// });

app.listen(process.env.PORT, () => {
    console.log('Server is running at PORT: ', process.env.PORT);
});

//Broker config
const brokerConfig = {
    clientId: 'hieu-sub',
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD,
};
const client = mqtt.connect(process.env.MQTT_BROKER_URL, brokerConfig);
const topic = 'getData';

client.on('message', async (topic, message) => {
    let data = JSON.parse(message.toString());

    await Sensor.create({
        accX: data.accX,
        accY: data.accY,
        accZ: data.accZ,
        gyX: data.gyX,
        gyY: data.gyY,
        gyZ: data.gyZ,
        temp: data.temp,
        humi: data.humi,
        mois: data.mois,
        rain: data.rain,
    });
    console.log(data);
});

client.on('connect', () => {
    console.log('from sub');
    client.subscribe(topic);
});
