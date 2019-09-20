import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import User from './routes/user.route';
import Trip from './routes/trip.route';
import Bus from './routes/bus.route';
import Booking from './routes/booking.route';

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v1/', User);
app.use('/api/v1/', Trip);
app.use('/api/v1/', Bus);
app.use('/api/v1', Booking);

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: [
      {
        message: 'Welcome to WayFare API Home Route',
      },
    ],
  });
});

// eslint-disable-next-line consistent-return
app.use((err, req, res, next) => {
  if (err) {
    return res.status(400).json({
      status: 'error',
      error: 'Bad Request',
    });
  }
  next();
});

// handle route error
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    error: 'Page not found',
  });
});

const port = process.env.PORT || 5000;
// eslint-disable-next-line no-console
const server = app.listen(port, () => console.log(`App runing on ${port}`));

export default server;
