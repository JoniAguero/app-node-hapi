'use strict'

const site = require('./controllers/site')
const user = require('./controllers/user')
const Joi = require('joi')

module.exports = [{
        method: 'GET',
        path: '/',
        handler: site.home
    },
    {
        method: 'GET',
        path: '/register',
        handler: site.register
    },
    {
        method: 'POST',
        path: '/create-user',
        options: {
            validate: {
                payload: {
                    name: Joi.string().required().min(3),
                    email: Joi.string().required().email(),
                    password: Joi.string().required().min(6)

                },
                failAction: user.failValidation
            }
        },
        handler: user.createUser
    },
    {
        method: 'GET',
        path: '/login',
        handler: site.login
    },
    {
        method: 'GET',
        path: '/logout',
        handler: user.logout
    },
    {
        method: 'POST',
        path: '/validate-user',
        options: {
            validate: {
                payload: {
                    email: Joi.string().required().email(),
                    password: Joi.string().required().min(6)
                },
                failAction: user.failValidation
            }
        },
        handler: user.validateUser
    },
    {
        method: 'GET',
        path: '/assets/{param*}',
        handler: {
            directory: {
                path: '.',
                index: ['index.html']
            }
        }
    },
    {
        method: ['GET', 'POST'],
        path: '/{any*}',
        handler: site.notFound
    }
]