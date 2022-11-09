//const store = require('../../../store/postgres')
const config = require('../../../config')
let store
let cache

if (config.remoteDB === true) {
    store = require('../../../store/remote-postgres')
    cache = require('../../../store/remote-cache')
} else {
    store = require('../../../store/postgres')
    cache = require('../../../store/redis')
}
const controller = require('./controller')

module.exports = controller(store, cache)