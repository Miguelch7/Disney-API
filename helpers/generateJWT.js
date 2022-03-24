const jwt = require('jsonwebtoken');

const generateJWT = ( id = '' ) => {

    return new Promise( ( resolve, reject ) => {
        const payload = { id };

        jwt.sign( payload, process.env.JWT_KEY, {
            expiresIn: '6h'
        }, ( error, token ) => {
            if ( error ) {
                console.log( error );
                
                reject( 'No se pudo generar el token');
            } else {
                resolve( token );
            };
        });

    }); 

};

module.exports = {
    generateJWT   
};
