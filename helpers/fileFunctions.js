const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const allowedExtensions = ['png', 'jpg', 'jpeg'];

const uploadFile = ( file, folder = '' ) => {

    return new Promise( (resolve, reject) => {

        const cutName = file.name.split('.');
        const extension = cutName[ cutName.length - 1 ];
    
        // Validar la extensión
        if ( !allowedExtensions.includes( extension )) {
            return reject(null);
        };
    
        // Generar nombre temporal
        const tempName = uuidv4() + '.' + extension;

        // Crear ruta
        const uploadPath = path.join( __dirname, '../uploads/', folder, tempName );
    
        file.mv(uploadPath, function(error) {
            if (error) {
                return reject(null);
            };

            resolve(tempName);
        });
    });
};

const deleteFile = ( file, folder = '' ) => {
    const imagePath = path.join( __dirname, '../uploads/', folder, file );

    if ( fs.existsSync( imagePath ) ) {
        fs.unlinkSync( imagePath );
    };
};

module.exports = {
    uploadFile,
    deleteFile
};
