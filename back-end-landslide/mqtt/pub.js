const mqtt = require('mqtt');
const dotenv = require('dotenv');

//using dotenv
dotenv.config();

//Broker config
const brokerConfig = {
    clientId: 'landslide-fakedata',
    username: 'landslide',
    password: 'oYPSNMspLlNXX5o8',
};
const client = mqtt.connect('mqtt://landslide.cloud.shiftr.io:1883', brokerConfig);
const getFakeData = () => {
    return Math.random().toFixed(3);
}



client.on('connect', () => {
    console.log('from pub');

    setInterval(() => {
        let accelFakeData = {
            accX: getFakeData(),
            accY: getFakeData(),
            accZ: getFakeData(),
        }
        let accelMess = JSON.stringify(accelFakeData);
        client.publish('accelerometer', accelMess);
        console.log('Message sent!: ', accelMess);

    },200);

    setInterval(() => {
        let gyroFakeData = { 
            gyX: getFakeData(),
            gyY: getFakeData(),
            gyZ: getFakeData(),
        }
        let gyroMess = JSON.stringify(gyroFakeData);
        client.publish('gyroscope', gyroMess);
        console.log('Message sent!: ', gyroMess);
    },200);

    setInterval(() => {
        let tempFakeData = {
            temp: getFakeData(),
            humi: getFakeData(),
            mois: getFakeData(),
        }
        let tempMess = JSON.stringify(tempFakeData);
        client.publish('temp', tempMess);
        console.log('Message sent!: ', tempMess);
    },5000);

    setInterval(() => {
        let rainFakeData = {
            rain: getFakeData(),
        }
        let rainMess = JSON.stringify(rainFakeData);
        client.publish('rain', rainMess);
        console.log('Message sent!: ', rainMess);
    },10000);

});
