import { Sequelize } from "sequelize";

const sequelize = new Sequelize('lipmangsysmte', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

try {
    await sequelize.authenticate();
    console.log('database connected succsesfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

export default sequelize