import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DATABASE_URL || "database",
    username: process.env.POSTGRES_USER || "user",
    password: process.env.POSTGRES_PASSWORD || "password",
    database: process.env.POSTGRES_DB || "app_db",
    logging: false, // logs de SQL no console
});

export default sequelize;