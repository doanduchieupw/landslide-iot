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
            aX: getFakeData(),
            aY: getFakeData(),
            aZ: getFakeData(),
        }
        let accelMess = JSON.stringify(accelFakeData);
        client.publish('accelerometer', accelMess);
        console.log('Message sent!: ', accelMess);

    },200);

    setInterval(() => {
        let gyroFakeData = { 
            gX: getFakeData(),
            gY: getFakeData(),
            gZ: getFakeData(),
        }
        let gyroMess = JSON.stringify(gyroFakeData);
        client.publish('gyroscope', gyroMess);
        console.log('Message sent!: ', gyroMess);
    },200);

    setInterval(() => {
        let tempFakeData = {
            t: getFakeData(),
            h: getFakeData(),
            m: getFakeData(),
        }
        let tempMess = JSON.stringify(tempFakeData);
        client.publish('temp', tempMess);
        console.log('Message sent!: ', tempMess);
    },5000);

    setInterval(() => {
        let rainFakeData = {
            r: getFakeData(),
        }
        let rainMess = JSON.stringify(rainFakeData);
        client.publish('rain', rainMess);
        console.log('Message sent!: ', rainMess);
    },3000);

});
