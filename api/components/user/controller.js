const nanoid = require('nanoid')
const auth = require('../auth')
const TABLA = 'user'

module.exports = function(injectedStore, injectedCache) {
    let store = injectedStore
    let cache = injectedCache
    if (!store) {
        store = require('../../../store/dummy')
    }
    if (!cache) {
        cache = require('../../../store/dummy')
    }
    
    async function list() {
        let users = await cache.list(TABLA)

        if (!users) {
            console.log('No estaba en caché. Buscando en BD')
            users = await store.list(TABLA)
            cache.upsert(TABLA, users)
        } else {
            console.log('Datos del Caché')
        }
        return users
    }

    function get(id) {
        return store.get(TABLA, id)
    }

    async function upsert(body) {
        //console.log(body)
        const user = {
            name: body.name,
            username: body.username,
            password: body.password
        }
        if (body.id) {
            user.id = body.id
        }
        if (body.password && body.username) {
            await auth.upsert({
                //id: user.id,
                username: user.username,
                password: user.password
            })
        }
        //console.log('Controller User',user)
        return store.upsert(TABLA, user)
    }

    async function follow(from, to) {
        return store.upsert(TABLA + '_follow', {
            user_from: from,
            user_to: to
        })
    }

    async function following(user) {
        /*const join = {}
        join[TABLA] = 'user_to'
        const query = {user_from: user}*/

        return await store.query(TABLA + '_follow', user)
    }

    return {
        list,
        get,
        upsert,
        follow,
        following
    }
}