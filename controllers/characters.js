const { response } = require('express');
const Character = require('../models/character');
const Movie = require('../models/movie');
const { uploadFile, deleteFile } = require('../helpers/fileFunctions');

const allowedParameters = ['name', 'age', 'movieId'];

// Listado de personajes
const getAllCharacters = async ( req, res = response ) => {

    const query = {};
    
    Object.keys(req.query).map( key => {
        if (!allowedParameters.includes(key)) {
            return res.json({
                msg: `Ingrese un parámetro de búsqueda válido [${allowedParameters}]`
            });
        };

        if (key) {
            query[key] = req.query[key];
        };
    });

    const characters = await Character.findAll({ where: query, attributes: [ 'image', 'name' ] });

    if (characters.length === 0) {
        return res.json({
            msg: 'No se han encontrado personajes con los parámetros de búsqueda'
        });
    };

    res.json({
        characters
    });
};

// Detalle de personaje
const getOneCharacter = async ( req, res = response ) => {
    const { id } = req.params;

    const character = await Character.findByPk(id, {
        include: {
            model: Movie,
            attributes: ['title']
        },
        attributes: ['id', 'name', 'image', 'age', 'weight', 'history']
    });

    if (!character) {
        return res.status(404).json({
            msg: 'No se ha encontrado un personaje con ese id'
        });
    };

    res.json({
        character
    });
};

// Crear personaje
const createCharacter = async ( req, res = response ) => {

    const { name, age, weight, history } = req.body;
    let image = null;

    if ( req.files.image ) {
        image = await uploadFile( req.files.image, 'characters' );
    };
    
    const character = await Character.create({ name, age, weight, image, history });

    res.status(200).json({
        msg: 'El personaje se ha creado con éxito',
        character
    });
};

// Editar personaje
const updateCharacter = async ( req, res = response ) => {

    const { id } = req.params;

    const character = await Character.findByPk(id);

    await character.update( req.body );

    await character.save();

    res.json({
        msg: 'El personaje se ha actualizado con éxito',
        character
    });
};

// Eliminar personaje
const deleteCharacter = async ( req, res = response ) => {

    const { id } = req.params;

    const character = await Character.findByPk(id);

    await character.destroy();

    if ( character.image ) {
        deleteFile( character.image, 'characters' );
    };

    res.json({
        msg: 'El personaje se ha eliminado con éxito'
    });
};

module.exports = {
    getAllCharacters,
    getOneCharacter,
    createCharacter,
    updateCharacter,
    deleteCharacter
};
