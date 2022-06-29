const authRouter = require('./auth');
const userRouter = require('./user');
const accelRouter = require('./accel');
const contactRouter = require('./contact');


const route = (app) => {
    app.use('/api/auth', authRouter);
    app.use('/api/users', userRouter);
    app.use('/api/accel', accelRouter);
    app.use('/api/contact', contactRouter);
}

module.exports = route;