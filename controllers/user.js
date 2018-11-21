'use strict'

const users = require('../models/index').users
const Boom = require('boom')

async function createUser(req, h) {
    let result
    try {
        result = await users.create(req.payload)
    } catch (error) {
        console.error(error)
        return h.view('register', {
            title: 'Registro',
            error: 'Error al crear Usuario'
        })
    }

    return h.view('register', {
        title: 'Registro',
        success: 'Usuario creado con éxito!'
    })
}

function logout(req, h) {
    return h.redirect('/login').unstate('user') /* unstate -> remueve la cookie */
}

function failValidation(req, h, err) {
    return Boom.badRequest('Falló la validación', req.payload) /* Boom -> Sirve para mostrar HTTP Erros de manera amigable */
}

async function validateUser(req, h) {
    let result
    try {
        result = await users.validateUser(req.payload)
        if (!result) {
            return h.view('login', {
                title: 'Login',
                error: 'Email y/o contraseña incorrecto.'
            })
        }
    } catch (error) {
        console.error(error)
        return h.view('login', {
            title: 'Login',
            error: 'Problemas validando el usuario.'
        })
    }

    return h.redirect('/').state('user', {
        name: result.name,
        email: result.email
    })
}

module.exports = {
    createUser: createUser,
    logout: logout,
    failValidation: failValidation,
    validateUser: validateUser
}