const remote = require('./remote');
const config = require('../config');

module.exports = new remote(config.postgresService.host, config.postgresService.port);