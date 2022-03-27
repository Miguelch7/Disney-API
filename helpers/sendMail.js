const nodemailer = require('nodemailer');

const sendMail = async (username, email) => {

    try {
        let transport = nodemailer.createTransport({
            host: process.env.NM_HOST,
            port: process.env.NM_PORT,
            auth: {
                user: process.env.NM_AUTH_USER,
                pass: process.env.NM_AUTH_PASS
            }
        });
    
        const contentMail = `
            <h1 style="
                text-align: center;
                font-family: Arial, Helvetica, sans-serif;
            ">¡Bienvenido a DisneyAPI!</h1>
    
            <h3 style="
                font-family: Arial, Helvetica, sans-serif;
            ">¡Hola, ${ username }!</h3>
    
            <p style="
                font-family: Arial, Helvetica, sans-serif;
            ">¡Gracias por unirte a DisneyAPI! Aqui podrás explorar cada uno de los personajes, peliculas o series realcionadas al mundo Disney.</p>
    
            <p style="
                font-family: Arial, Helvetica, sans-serif;
            ">¿Tiene preguntas? Por favor, contáctenos en <a href="mailto:support@disneyapi.com">support@disneyapi.com</a>.</p>
        `;
    
        await transport.sendMail({
            from: '"Miguel de DisneyAPI" <mchanampa@disneyapi.com>',
            to: email,
            subject: '¡Bienvenido a DisneyAPI!', 
            html: contentMail
        });

    } catch (error) {
        console.log(error);
    };
};

module.exports = {
    sendMail
};
