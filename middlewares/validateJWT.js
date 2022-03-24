const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async ( req = request, res = response, next ) => {

    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    };

    try {

        const { id } = jwt.verify( token, process.env.JWT_KEY );

        const user = await User.findByPk( id );

        // Verificar si el usuario existe
        if ( !user ) {
            return res.status(401).json({
                msg: 'Token no válido'
            });
        };

        req.user = user;

        next();
    } catch ( error ) {
        res.status(401).json({
            msg: 'Token no válido'
        });
    };

};

module.exports = {
    validateJWT
};
