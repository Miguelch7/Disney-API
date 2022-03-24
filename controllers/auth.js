const { response } = require('express');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generateJWT');
const User = require('../models/users');

const register = async ( req, res = response ) => {
    
    const { username, email, password } = req.body;

    const user = User.build({ username, email, password });
    
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    // Guardar en DB
    await user.save();

    // Generar JWT
    const token = await generateJWT( user.id );

    res.status(200).json({
        msg: 'Registro exitoso',
        user,
        token
    });
};

const login = async ( req, res = response ) => {
    
    const { email, password } = req.body;

    const user = await User.findOne( { where: { email } });

    if ( !user || !bcryptjs.compareSync( password, user.password ) ) {
        return res.status(400).json({
            msg: 'Usuario/Contraseña incorrectos'
        });
    };
    
    // Generar JWT
    const token = await generateJWT( user.id );

    res.json({
        msg: 'Inicio de sesión exitoso',
        user,
        token
    });
};

module.exports = {
    register,
    login
};
