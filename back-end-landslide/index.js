const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGODB_URL, () => {
    console.log(('CONNECTED TO MONGODB'));
})


app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.listen(process.env.PORT, () => {
    console.log('Server is running at PORT: 4000');
})