const { Model, DataTypes } = require('sequelize');
const { db } = require('../db/config');
const Genre = require('./genre');

class Movie extends Model {};
Movie.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El título de la película/serie no puede ir vacío'
            }
        }
    },
    image: DataTypes.STRING(60),
    published: DataTypes.DATEONLY,
    qualification: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    sequelize: db,
    modelName: 'movie'
});

Genre.hasMany(Movie, { foreignKey: 'genreId' });
Movie.belongsTo(Genre, { foreignKey: 'genreId' });

module.exports = Movie;
