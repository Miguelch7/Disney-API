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

module.exports = {
    getCharacters,
    createCharacter
};
