const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const dbConnection = async () => {

    try {
        await sequelize.authenticate();
        
        console.log('EXITO! DB Conectada');
    } catch (error) {
        console.log(error);
        throw new Error('ERROR! No se pudo conectar a la base de datos.');
    };

};

module.exports = {
    dbConnection
};
