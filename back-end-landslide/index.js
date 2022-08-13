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
const Alert = require('./models/Alert');
const moment = require('moment');
const io = require('socket.io')(8080, {
    cors: {
        origin: 'http://localhost:3000',
    },
});

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
let vibrationWarnFlag = false;
let rainWarnFlag = false;
let moisWarnFlag = false;

let rainDup = false;
let tempDup = false;

client.on('message', async (topic, message) => {
    let data = JSON.parse(message.toString());

    if (topic === 'accelerometer') {
        await Accel.create({
            accX: data.aX,
            accY: data.aY,
            accZ: data.aZ,
        });
        if (
            (parseFloat(data?.aZ) < 0.8 ||
                parseFloat(data?.aZ) > 0.9 ||
                parseFloat(data?.aX) < -0.05 ||
                parseFloat(data?.aX) > 0.05 ||
                parseFloat(data?.aY) < -0.05 ||
                parseFloat(data?.aY) > 0.05) &&
            !vibrationWarnFlag
        ) {
            let warnMess = {
                type: 'vibration',
                message: 'Phat hien rung chan',
                data: {
                    accX: parseFloat(data.aX),
                    accY: parseFloat(data.aY),
                    accZ: parseFloat(data.aZ),
                },
                date: moment.utc().format(),
            };

            await Alert.create(warnMess);
            client.publish('warning', JSON.stringify(warnMess));
            vibrationWarnFlag = true;
            setTimeout(() => {
                vibrationWarnFlag = false;
            }, 20000);
        }
    }
    if (topic === 'gyroscope') {
        await Gyro.create({
            gyX: data.gX,
            gyY: data.gY,
            gyZ: data.gZ,
        });
    }
    if (topic === 'temp' && !tempDup) {
        tempDup = true;
        setTimeout(() => tempDup = false, 5000)
        await Temp.create({
            temp: data.t,
            humi: data.h,
            mois: data.m,
        });
        if (parseFloat(data?.m) >= 80 && !moisWarnFlag) {
            let warnMess = {
                type: 'mois',
                message: 'Phat hien do am dat cao',
                data: {
                    temp: parseFloat(data.t),
                    humi: parseFloat(data.h),
                    mois: parseFloat(data.m),
                },
                date: moment.utc().format(),
            };

            await Alert.create(warnMess);
            client.publish('warning', JSON.stringify(warnMess));
            moisWarnFlag = true;
            setTimeout(() => {
                moisWarnFlag = false;
            }, 30 * 60000);
        }
    }
    if (topic === 'rain' && !rainDup) {
        rainDup = true;
        setTimeout(() => rainDup = false, 5000) 
        await Rain.create({
            rain: parseFloat(data.r)*0.15,
        });
        if (parseFloat(data?.r) >= 50 && !rainWarnFlag) {
            let warnMess = {
                type: 'rain',
                message: 'Canh bao luong mua lon',
                data: {
                    rain: parseFloat(data?.r)*0.15,
                },
                date: moment.utc().format(),
            };

            await Alert.create(warnMess);
            client.publish('warning', JSON.stringify(warnMess));
            rainWarnFlag = true;
            setTimeout(() => {
                rainWarnFlag = false;
            }, 30 * 60000);
        }
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

//Contact
let activeUsers = [];
io.on('connection', (socket) => {
    socket.on('new-user-add', (newUserId) => {
        if (!activeUsers.some((user) => user.userId === newUserId)) {
            activeUsers.push({
                userId: newUserId,
                socketId: socket.id,
            });
            console.log('Connected users', activeUsers);
        }

        io.emit('get-users', activeUsers);
    });

    socket.on('send-message', (data) => {
        const { receiverId } = data;
        const user = activeUsers.find((user) => user.userId === receiverId);
        console.log('sending from socket ', receiverId);
        console.log('Data', data);
        if (user) {
            io.to(user.socketId).emit('receive-message', data);
        }
    });

    socket.on('disconnect', () => {
        activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
        console.log('User disconnected', activeUsers);
        io.emit('get-users', activeUsers);
    });
});
