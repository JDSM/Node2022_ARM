//const store = require('../../../store/postgres')
const store = require('../../../store/remote-postgres')
const controller = require('./controller')

module.exports = controller(store)