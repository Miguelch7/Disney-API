const User = require('../models/user');

const usernameExists = async ( username = '' ) => {
    const user = await User.findOne( { where: { username } }) ;
    
    if ( user ) {
        throw new Error(`El nombre de usuario '${ username }' ya está registrado en la base de datos.`);
    };
};

const emailExists = async ( email = '' ) => {
    const user = await User.findOne( { where: { email } });
    
    if ( user ) {
        throw new Error(`El email '${ email }' ya está registrado en la base de datos.`);
    };
};

module.exports = {
    usernameExists,
    emailExists
};
