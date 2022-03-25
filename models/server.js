const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.SERVER_PORT;

        this.paths = {
            auth: '/auth',
            characters: '/characters',
            movies: '/movies'
        };

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
        this.app.use( this.paths.auth, require('../routes/auth') );
        this.app.use( this.paths.characters, require('../routes/characters') );
        this.app.use( this.paths.movies, require('../routes/movies') );
    };

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    };

};

module.exports = Server;
