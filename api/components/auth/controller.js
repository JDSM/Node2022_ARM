//const bcrypt = require('bcrypt')
const bcrypt = require('bcryptjs')
const auth = require('../../../auth')
const TABLA = 'auth'
module.exports = function (injectedStore) {
    let store = injectedStore
    if (!store) {
        store = require('../../../store/dummy')
    }

    async function login(username, password) {
        const data = await store.query(TABLA, { username: username })
        //console.log ('Data: ' + data)
        //console.log ('password: ' + password)
        //return data
        return bcrypt.compare(password, data.password)
            .then(sonIguales =>{
                if (sonIguales) {
                    //generar el token
                    return auth.sign(data)
                } else {
                    throw new Error('Informacion invalida')
                }
            })
    }

    async function upsert(data) {
        //console.log(data)
        const authData = {
            //id: data.id,
        }
        if (data.username) {
            authData.username = data.username
        }
        if (data.password) {
            authData.password = await bcrypt.hash(data.password,5)
        }
        //console.log(authData)
        return store.upsert(TABLA, authData)
    }
    return {
        upsert,
        login
    }
}