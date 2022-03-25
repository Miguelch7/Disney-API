const User = require('../models/user');
const Character = require('../models/character');

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

const characterExistById = async ( id = '' ) => {
    const character = await Character.findByPk(id);

    if ( !character ) {
        throw new Error(`No existe un personaje con ese id`);
    };
};

module.exports = {
    usernameExists,
    emailExists,
    characterExistById
};
