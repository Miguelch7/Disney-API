const { response } = require('express');
const Character = require('../models/character');

// Listado de personajes
const getAllCharacters = async ( req, res = response ) => {

    const { query } = req;

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

    const character = await Character.findByPk(id);

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
    
    const character = await Character.create( req.body );

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
