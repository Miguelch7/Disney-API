const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/users');

const register = async ( req, res = response ) => {
    
    const { username, email, password } = req.body;

    const user = User.build({ username, email, password });
    
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    // Guardar en DB
    await user.save();

    res.json({
        user
    });
};

module.exports = {
    register
};
