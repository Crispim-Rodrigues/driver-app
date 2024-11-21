import sequelize from '../config/database'
import Driver from '../models/driver.model';

async function syncDatabase() {
    try {
        // Sincronizar o banco de dados (criar tabelas se não existirem)
        await sequelize.sync({ alter: true }); // Use { force: true } para recriar tudo do zero

        console.log('Database synchronized.');

        // Verificar se já existem motoristas cadastrados
        const existingDrivers = await Driver.findAll();
        if (existingDrivers.length === 0) {
            // Popular o banco com os motoristas iniciais
            await Driver.bulkCreate([
                { name: 'Homer Simpson', description: 'Olá, Sou o Homer,  seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).', car: 'Plymouth Valiant 1973 rosa e enferrujado', rating: 2.0, price_per_km: 2.50, min_km: 1},
                { name: 'Dominic Toretto', description: 'Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.', car: 'Dodge Charger R/T 1970 modificado', rating: 4.0, price_per_km: 5.00, min_km: 5},
                { name: 'James Bond', description: 'Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.', car: 'Aston Martin DB5 clássico', rating: 5.0, price_per_km: 10.00, min_km: 10}
            ]);
            console.log('Initial drivers added to the database.');
        }
    } catch (error) {
        console.error('Error synchronizing database:', error);
    }
}

export default syncDatabase;
