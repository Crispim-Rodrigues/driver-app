import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Driver extends Model {
    declare id: number; // Id do Motorista
    declare name: string; // Dome do motorista
    declare description: string; // Descrição do Motorista
    declare car: string; // Carro
    declare rating: number; // Avaliacao do motorista
    declare price_per_km: number; // Preço por Km
    declare min_km: number; // Quilometragem mínima
}

Driver.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    car: {
        type: DataTypes.STRING
    },
    rating: {
        type: DataTypes.DECIMAL(2, 1)
    },
    price_per_km: {
        type: DataTypes.DECIMAL(5, 2)
    },
    min_km: {
        type: DataTypes.INTEGER, // Quilometragem mínima para aceitar corridas
        allowNull: false,
        defaultValue: 0
    }
}, {
    sequelize,
    modelName: 'Driver',
    tableName: 'drivers',
    timestamps: false
});

export default Driver;
