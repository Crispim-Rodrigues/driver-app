import dotenv from 'dotenv';
import express from 'express';
import syncDatabase from './seed';

dotenv.config();

const app = express();
const PORT = 8080;

app.get('/', (req, res) => {
    res.send('Configuração!');
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
syncDatabase();
