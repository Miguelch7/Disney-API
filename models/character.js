const Sequelize = require('sequelize');
const { db } = require('../db/config');

const Character = db.define('character', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El nombre del personaje no puede ir vacío'
            }
        }
    },
    image: Sequelize.STRING(60),
    age: Sequelize.INTEGER,
    weight: Sequelize.INTEGER,
    history: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'La historia del personaje es obligatoria'
            }
        }
    }
});

module.exports = Character;
