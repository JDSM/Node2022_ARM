const store = require('../../../store/postgres')
const ctrl = require('./controller');

module.exports = ctrl(store);