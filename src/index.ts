import express from 'express';
import routes from './routes/index';

const app = express();
const port = 3000;

app.use('/api', routes);

app.get('/', (_, res) => {
  res.status(200).send('Server is working!');
});

app.listen(port, () => console.log(`Running on port ${port}`));

export default app;
