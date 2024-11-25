import dotenv from 'dotenv';
import express from 'express';
import syncDatabase from './config/syncDataBase';
import rideRouter from "./routes/rite.routes"

dotenv.config();

const app = express();


// Middleware para parsing de JSON
app.use(express.json());

//Conecta e popula o banco de dados
syncDatabase();

//configurar rotas
app.use('/ride', rideRouter);


const PORT = 8080;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));

