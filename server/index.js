import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoute from './routes/userRoute.js';
import bidRoute from './bidModel/BidRoutes.js'; // Adjusted route path

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 8001;
const mongourl = process.env.MONGOURL;

mongoose.connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.use('/api/user', userRoute);
app.use('/api/products', bidRoute);
