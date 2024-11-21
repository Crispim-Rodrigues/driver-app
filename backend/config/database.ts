import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DATABASE_URL,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    logging: false, // logs de SQL no console
});

export default sequelize;