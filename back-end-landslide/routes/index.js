const authRouter = require('./auth');
const userRouter = require('./user');
const accelRouter = require('./accel');
const rainRouter = require('./rain');
const tempRouter = require('./temp');
const contactRouter = require('./contact');
const alertRouter = require('./alert');


const route = (app) => {
    app.use('/api/auth', authRouter);
    app.use('/api/users', userRouter);
    app.use('/api/accel', accelRouter);
    app.use('/api/rain', rainRouter);
    app.use('/api/temp', tempRouter);
    app.use('/api/contact', contactRouter);
    app.use('/api/alert', alertRouter);
}

module.exports = route;