"use strict"

const Hapi = require('hapi');

// Configuramos el servidor
const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: 'localhost'
});

async function init () {
    // Configuramos las rutas de accedo a nuestro API
    server.route({
        method: 'GET',
        path: '/hola',
        handler: (request, h) => {
            return 'Hola Mundo';
        }
    })

    try {
        await server.start()
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
    console.log(`Servidor corriendo en ${server.info.uri}`);
    
}

init();



