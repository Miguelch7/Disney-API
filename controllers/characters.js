const { response } = require('express');
const Character = require('../models/character');

const getCharacters = async ( req, res = response ) => {
    
    const characters = await Character.findAll();

    res.json({
        characters
    });
};

module.exports = {
    getCharacters
};
