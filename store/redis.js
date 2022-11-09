//TODO LO DE REDIS
const redis = require('redis')
const config = require('../config')

/*const client = redis.createClient({
    host: config.redis.host,
    port: config.redis.port,
    password: config.redis.password,
    user: 'default'
})*/

const client = redis.createClient({
    url: `redis://${config.redis.user}:${config.redis.password}@${config.redis.host}:${config.redis.port}`
  });

async function connect() {
    await client.connect();
    console.log('Conectado a REDIS');
}

connect()

async function list(table) {
    const value = await client.get(table);
    return JSON.parse(value);
}

async function get(table) {
    
}

async function upsert(table,data) {
    let key = table
    if (data && data.id) {
        key = key + '_' + data.id
    }
    client.setEx(key, 10, JSON.stringify(data))
    return true
}

module.exports = {
    list,
    get,
    upsert
}