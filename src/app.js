import express from 'express';
import cookieParser from 'cookie-parser';
import collegeDetailRoutes from './router/collegeRouter.js';
import authRouter from './router/authRouter.js';

const port = 3001;

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(express.static('public'));

app.use(collegeDetailRoutes);

app.use(authRouter);

app.listen(port, () => {
    console.log(`Server running at ${port}`);
});