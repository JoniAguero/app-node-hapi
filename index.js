'use strict'

const Hapi = require('hapi')
const inert = require('inert')
const path = require('path')
const hbs = require('handlebars')
const vision = require('vision')

const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: 'localhost',
    routes: {
        files: {
            relativeTo: path.join(__dirname, 'public')
        }
    }
})

async function init() {
    try {
        await server.register(inert)
        await server.register(vision)

        server.views({
            engines: { // --- hapi puede usar diferentes engines
                hbs: hbs // --- asociamos el plugin al tipo de archivos
            },
            relativeTo: __dirname, // --- para que las vistas las busque fuera de /public
            path: 'views', // --- directorio donde colocaremos las vistas dentro de nuestro proyecto
            layout: true, // --- indica que usaremos layouts 
            layoutPath: 'views' // --- ubicación de los layouts
        })

        server.route({
            method: 'GET',
            path: '/',
            handler: (req, h) => {
                return h.view('index', {
                    title: 'Home'
                })
            }
        })

        server.route({
            method: 'GET',
            path: '/register',
            handler: (req, h) => {
                return h.view('register', {
                    title: 'Registro'
                })
            }
        })

        server.route({
            method: 'POST',
            path: '/create-user',
            handler: (req, h) => {
                console.log(req.payload);
                return 'Usuario Creado'
            }
        })

        await server.start()
    } catch (error) {
        console.error(error)
        process.exit(1)
    }

    console.log(`Servidor corriendo en: ${server.info.uri}`)
}

init()