const mqtt = require('mqtt');
const dotenv = require('dotenv');

//using dotenv
dotenv.config();

//Broker config
const brokerConfig = {
    clientId: 'hieu-pub',
    username: 'landslide',
    password: 'oYPSNMspLlNXX5o8',
};
const client = mqtt.connect('mqtt://landslide.cloud.shiftr.io:1883', brokerConfig);
const topic = 'getData'
const getFakeData = () => {
    return Math.random().toFixed(3);
}



client.on('connect', () => {
    console.log('from pub');

    setInterval(() => {
        let data = {
            accX: getFakeData(),
            accY: getFakeData(),
            accZ: getFakeData(),
            gyX: getFakeData(),
            gyY: getFakeData(),
            gyZ: getFakeData(),
            temp: getFakeData(),
            humi: getFakeData(),
            mois: getFakeData(),
            rain: getFakeData(),
        }
        console.log(data);
        let message = JSON.stringify(data);
        client.publish(topic, message);
        console.log('Message sent!: ', message);
    }, 500);
});
