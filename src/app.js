import express from 'express';
import cookieParser from 'cookie-parser';
import collegeDetailRoutes from './router/collegeRouter.js';
import authRouter from './router/authRouter.js';
import studentRouter from './router/studentRouter.js';
import forgetRoutes from './router/forgetrouter.js';
import adminTeamRouter from './router/adminTeam.js';
import collegeApplicationaRouter from './router/collegeApplication.js';

const port = 3001;

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(express.static('public'));

app.use(collegeDetailRoutes);

app.use(forgetRoutes);

app.use('/auth',authRouter);

app.use(studentRouter)

app.use(adminTeamRouter)

app.use(collegeApplicationaRouter)

app.listen(port, () => {
    console.log(`Server running at ${port}`);
});