const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const route = require('./routes')

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
    .catch((err) => console.log(err))

app.use(cors());
app.use(cookieParser());
app.use(express.json());

//Init router
route(app);

app.listen(process.env.PORT, () => {
    console.log('Server is running at PORT: ', process.env.PORT);
})