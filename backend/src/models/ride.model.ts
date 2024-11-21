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
    declare price: number;
    declare driver_id: number;
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
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    driver_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Driver,
            key: 'id'
        },
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
