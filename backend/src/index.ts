import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();
const PORT = 8080;

app.get('/', (req, res) => {
    res.send('Configuração Inicial!');
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
