const Sequelize = require('sequelize');
const { db } = require('../db/config');

const User = db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El usuario no puede ir vacío'
            }
        },
        unique: {
            args: true,
            msg: 'El usuario ya existe'
        }
    },
    email: {
        type: Sequelize.STRING(30),
        allowNull: false,
        validate: {
            isEmail: {
                msg: 'Agrega un email válido'
            }
        },
        unique: {
            args: true,
            msg: 'El email ya está registrado'
        }
    },
    password: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El password no puede ir vacío'
            }
        }
    }
});

module.exports = User;
