require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const router = require('./router/userRouter');

const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        credentials: true,
        origin: process.env,
    }),
);
app.use('/', router);

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {});
        console.log('Подключение установлено');
        app.listen(PORT, () => console.log(`server started on PORT=${PORT}`));
    } catch (e) {
        console.log(e);
    }
};
start();
