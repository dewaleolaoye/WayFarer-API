import express from 'express';
import Debug from 'debug';

const logger = new Debug('http');
const app = express();

app.get('/', (req, res) => {
  res.send('Huuuuuuurray WayFarer');
});

const port = process.env.PORT || 5000;
app.listen(port, () => logger(`App runing on ${port}`));
