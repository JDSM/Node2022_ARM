//const store = require('../../../store/postgres')
const config = require('../../../config')
let store

if (config.remoteDB === true) {
    store = require('../../../store/remote-postgres')
} else {
    store = require('../../../store/postgres')
}
const controller = require('./controller')

module.exports = controller(store)