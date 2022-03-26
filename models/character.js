const { Model, DataTypes } = require('sequelize');
const { db } = require('../db/config');
const Movie = require('./movie');

class Character extends Model {};
Character.init({
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
                msg: 'El nombre del personaje no puede ir vacío'
            }
        }
    },
    image: DataTypes.STRING(60),
    age: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
    history: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'La historia del personaje es obligatoria'
            }
        }
    }
}, {
    sequelize: db,
    modelName: 'character'
});

Movie.hasMany(Character, { foreignKey: 'movieId'} );
Character.belongsTo(Movie, { foreignKey: 'movieId' });

module.exports = Character;
