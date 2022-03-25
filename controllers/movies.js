const { response } = require('express');
const Movie = require('../models/movie');

// Listado de películas/series
const getAllMovies = async ( req, res = response ) => {

    const { query } = req;

    const movies = await Movie.findAll({ where: query, attributes: [ 'image', 'title', 'published' ] });

    if (movies.length === 0) {
        return res.json({
            msg: 'No se han encontrado películas/series con los parámetros de búsqueda'
        });
    };

    res.json({
        movies
    });
};

// Detalle de película/serie
const getOneMovie = async ( req, res = response ) => {
    const { id } = req.params;

    const movie = await Movie.findByPk(id);

    if (!movie) {
        return res.status(404).json({
            msg: 'No se ha encontrado una película/serie con ese id'
        });
    };

    res.json({
        movie
    });
};

// Crear película/serie
const createMovie = async ( req, res = response ) => {
    
    const movie = await Movie.create( req.body );

    res.status(200).json({
        msg: 'La película/serie se ha creado con éxito',
        movie
    });
};

// Editar película/serie
const updateMovie = async ( req, res = response ) => {

    const { id } = req.params;

    const movie = await Movie.findByPk(id);

    await movie.update( req.body );

    await movie.save();

    res.json({
        msg: 'La película/serie se ha actualizado con éxito',
        movie
    });
};

// Eliminar película/serie
const deleteMovie = async ( req, res = response ) => {

    const { id } = req.params;

    const movie = await Movie.findByPk(id);

    await movie.destroy();

    res.json({
        msg: 'La película/serie se ha eliminado con éxito'
    });
};

module.exports = {
    getAllMovies,
    getOneMovie,
    createMovie,
    updateMovie,
    deleteMovie
};
