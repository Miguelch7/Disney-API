const { response } = require('express');
const Movie = require('../models/movie');

// Listado de películas/series
const getAllMovies = async ( req, res = response ) => {

    const movies = await Movie.findAll({ attributes: [ 'image', 'title', 'published' ] });

    res.json({
        movies
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

module.exports = {
    getAllMovies,
    createMovie
};
