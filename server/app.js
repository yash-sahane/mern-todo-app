import express from 'express';
import userRouter from './routes/user.js'
import taskRouter from './routes/task.js'
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import { ErrorMiddleware } from './middlewares/error.js';
import cors from 'cors';

export const app = express();

config({
    path: './database/config.env'
})

// add the following code to enable CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URI);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URI
}));
app.use('/users', userRouter)
app.use('/tasks', taskRouter);


app.get('/', (req, res) => {
    res.send('index page')
})

app.use(ErrorMiddleware);