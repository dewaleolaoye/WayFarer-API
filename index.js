import express from 'express';
import bodyParser from 'body-parser';
import Debug from 'debug';
import user from './src/routes/user.route';

const app = express();
const logger = new Debug('http');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/v1/auth', user);

const port = process.env.PORT || 4000;
const server = app.listen(port, () => logger(`App runing on ${port}`));

module.exports = server;
