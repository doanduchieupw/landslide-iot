const authRouter = require('./auth');
const userRouter = require('./user');
const sensorRouter = require('./sensor');


const route = (app) => {
    app.use('/api/auth', authRouter);
    app.use('/api/users', userRouter);
    app.use('/api/sensor', sensorRouter);
}

module.exports = route;