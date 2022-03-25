const { response } = require('express');
const Character = require('../models/character');

const getCharacters = async ( req, res = response ) => {

    const characters = await Character.findAll();

    res.json({
        characters
    });
};

const createCharacter = async ( req, res = response ) => {
    
    const character = await Character.create( req.body );

    res.status(200).json({
        msg: 'El personaje se ha creado con éxito',
        character
    });
};

const updateCharacter = async ( req, res = response ) => {

    const { id } = req.params;

    let character = await Character.findByPk(id);

    await character.update( req.body );

    await character.save();

    res.json({
        msg: 'El personaje se ha actualizado con éxito',
        character
    });
};

module.exports = {
    getCharacters,
    createCharacter,
    updateCharacter
};
