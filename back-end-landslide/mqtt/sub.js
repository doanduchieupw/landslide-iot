const mqtt = require('mqtt');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const Sensor = require('../model/sensorModel');

//using dotenv
dotenv.config();

//Connect to database
mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('DB Connection Successfull');
    })
    .catch((err) => {
        console.log(err.message);
    });

//Broker config
const brokerConfig = {
    clientId: 'hieu-sub',
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD,
}
const client = mqtt.connect(process.env.MQTT_BROKER_URL, brokerConfig)
const topic = 'getData';


client.on('message', async (topic, message) => {
    let data = JSON.parse(message.toString())

    // let data = parseFloat(message);
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
    })
    console.log(data);
})

client.on('connect', () => {
    console.log('from sub');
    client.subscribe(topic)
})