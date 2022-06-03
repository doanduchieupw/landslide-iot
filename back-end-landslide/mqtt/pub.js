const mqtt = require('mqtt');
const dotenv = require('dotenv');

//using dotenv
dotenv.config();

//Broker config
const brokerConfig = {
    clientId: 'hieu-pub',
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD,
};
const client = mqtt.connect(process.env.MQTT_BROKER_URL, brokerConfig);
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
    }, 5000);
});
