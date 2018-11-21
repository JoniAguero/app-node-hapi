'use strict'

const bcrypt = require('bcrypt')

class Users {
    /* Recibimos por parametro la BD de firebase */
    constructor(db) {
        this.db = db
        this.ref = this.db.ref('/')
        this.collection = this.ref.child('users')
    }

    async create(data) {
        data.password = await this.constructor.encrypt(data.password) /* Utilizamos constructor para que sea un método estático */
        const newUser = this.collection.push()
        newUser.set(data)

        return newUser.key
    }

    /* static -> método estático porque no debe ser modificado de la clase */

    static async encrypt(passwd) {
        const saltRounds = 10 /* Parametro que pide bcrypt */
        const hashedPassword = await bcrypt.hash(passwd, saltRounds)
        return hashedPassword
    }
}

module.exports = Users