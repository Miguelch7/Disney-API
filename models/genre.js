const { Model, DataTypes } = require('sequelize');
const { db } = require('../db/config');

class Genre extends Model {};
Genre.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El nombre del género no puede ir vacío'
            }
        }
    },
    image: {
        type: DataTypes.STRING(60)
    }
}, {
    sequelize: db,
    modelName: 'genre'
});

module.exports = Genre;
