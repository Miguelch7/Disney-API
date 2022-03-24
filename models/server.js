const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.SERVER_PORT;

        // Conectar a la base de datos
        this.connectDB();

        // Middlewares
        this.middlewares();

        // Rutas de la app
        this.routes();
    };

    async connectDB() {
        await dbConnection();
    };
    
    middlewares() {
        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio público
        this.app.use( express.static('public') );
    };

    routes() {

    };

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    };

};

module.exports = Server;
