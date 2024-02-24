require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const path = require('path');
const errorMiddleware = require('./middleware/errorMiddleware');
const userRouter = require('./router/userRouter');
const productsRouter = require('./router/productsRouter');

const PORT = process.env.PORT || 8000;
const app = express();

app.use(
    cors({
        credentials: true,
        origin: process.env,
    }),
);
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use('', userRouter);
app.use('', productsRouter);

app.use(errorMiddleware);

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
