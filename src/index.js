import express from 'express';
import bodyParser from 'body-parser';
// import Debug from 'debug';
import cors from 'cors';
import user from './routes/user.route';
import Trip from './routes/trip.route';
import Bus from './routes/bus.route';
import Booking from './routes/booking.route';

const app = express();
// const logger = new Debug('http');

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v1/auth', user);
app.use('/api/v1/', Trip);
app.use('/api/v1/', Bus);
app.use('/api/v1', Booking);

const port = process.env.PORT || 5000;
// eslint-disable-next-line no-console
const server = app.listen(port, () => console.log(`App runing on ${port}`));

module.exports = server;
