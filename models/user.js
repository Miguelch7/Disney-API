const { Model, DataTypes } = require('sequelize');
const { db } = require('../db/config');

class User extends Model {};
User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING(60),
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
        type: DataTypes.STRING(30),
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
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El password no puede ir vacío'
            }
        }
    }
}, {
    sequelize: db,
    modelName: 'user'
});

module.exports = User;
