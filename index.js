import express from 'express';
import bodyParser from 'body-parser';
import Debug from 'debug';
import user from './src/routes/user.route';

const app = express();
const logger = new Debug('http');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/v1/user', user);

app.get('/', (req, res) => {
  res.send('Huuuuuuurray WayFarer');
});

const port = process.env.PORT || 5000;
app.listen(port, () => logger(`App runing on ${port}`));
