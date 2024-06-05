import express from 'express';
import collegeDetailRoutes from './router/collegeRouter.js';

const port = 3001;

const app = express();

app.use(express.json());

app.use(express.static('public'));

app.use(collegeDetailRoutes);

app.listen(port, () => {
    console.log(`Server running at ${port}`);
});