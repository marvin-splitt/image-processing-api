import express from 'express';
import fs from 'fs';
import path from 'path';
import routes from './routes/index';

const app = express();
const port = 3000;

app.use('/api', routes);

app.get('/', (_, res) => {
    res.status(200).send('Server is working!');
});

app.listen(port, () => {
    // make sure thumb folder exists
    const thumbPath = path.resolve(__dirname, '../assets/thumb');

    if (!fs.existsSync(thumbPath)) {
        fs.mkdirSync(thumbPath);
    }

    console.log(`Running on port ${port}`);
});

export default app;
