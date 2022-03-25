const Sequelize = require('sequelize');
const { db } = require('../db/config');

const Movie = db.define('movie', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El título de la película/serie no puede ir vacío'
            }
        }
    },
    image: Sequelize.STRING(60),
    published: Sequelize.DATEONLY,
    qualification: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
});

module.exports = Movie;
