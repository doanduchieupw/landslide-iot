const userRouter = require('./auth');


const route = (app) => {
    app.use('/api/auth', userRouter)
}

module.exports = route;