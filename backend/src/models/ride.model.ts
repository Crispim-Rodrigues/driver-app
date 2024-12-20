import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Driver from './driver.model';

class Ride extends Model {
    declare id: number;
    declare customer_id: string;
    declare origin: string;
    declare destination: string;
    declare distance: number;
    declare duration: string;
    declare value: number;
    declare driver_id: number;
    declare status: "pending" | "confirmed";
    declare createdAt: Date;
    declare updatedAt: Date;

    declare driver?: { id: number; name: string };
}

Ride.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    customer_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    origin: {
        type: DataTypes.STRING,
        allowNull: false
    },
    destination: {
        type: DataTypes.STRING,
        allowNull: false
    },
    distance: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    duration: {
        type: DataTypes.STRING,
        allowNull: false
    },
    value: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    driver_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Driver,
            key: 'id'
        },
        allowNull: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Ride',
    tableName: 'rides',
    timestamps: true // Adiciona `createdAt` e `updatedAt`
});

// Definir relacionamento com Drivers
Driver.hasMany(Ride, { foreignKey: 'driver_id' });
Ride.belongsTo(Driver, { foreignKey: 'driver_id' });

export default Ride;
