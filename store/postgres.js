const {Pool} = require('pg')
const config = require('../config')

const pool = new Pool({
    user: config.postgres.user,
    host: config.postgres.host,
    database: config.postgres.database,
    password: config.postgres.password,
    port: config.postgres.port,
    ssl: {
        rejectUnauthorized: false,
    }
})

let connection

function handleCon() {
    connection = pool

    connection.connect((err) => {
        if (err) {
            console.error('[db err]', err)
            //setTimeout(handleCon, 2000)
        }
        else {
            console.log('DB Connected!')
        }
    })
    connection.on('error', err => {
        console.error('[db err]', err)
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleCon()
        }
        else {
            throw err
        }
    })
}

handleCon()

function list(table) {
    return new Promise( (resolve, reject) => {
        connection.query(`SELECT * FROM public."${table}"`, (err, data) => {
            if (err) {
                return reject(err)
            }
            resolve(data.rows)
        })
    })
}

function get(table, id) {
    return new Promise( (resolve, reject) => {
        connection.query(`SELECT * FROM public."${table}" WHERE "ID"=${id}`, (err, data) => {
            if (err) {
                return reject(err)
            }
            resolve(data.rows)
        })
    })
}

function insert(table, data) {
    //console.log(data, table)
    return new Promise( (resolve, reject) => {
        switch (table) {
            case 'auth':
                connection.query(`INSERT INTO public."${table}" (username, password) VALUES ('${data.username}', '${data.password}')`, (err, result) => {
                    if (err) {
                        return reject(err)
                    }
                    resolve(result.rows)
                })
                break;
        
            case 'user':
                connection.query(`INSERT INTO public."${table}" (username, name) VALUES ('${data.username}', '${data.name}')`, (err, result) => {
                    if (err) {
                        return reject(err)
                    }
                    resolve(result.rows)
                })
                break;
            case 'user_follow':
                connection.query(`INSERT INTO public."${table}" (user_from, user_to) VALUES ('${data.user_from}', '${data.user_to}')`, (err, result) => {
                    if (err) {
                        return reject(err)
                    }
                    resolve(result.rows)
                })
                break;
        }
    })
}

function update(table, data) {
    //console.log(data, table)
    return new Promise( (resolve, reject) => {
        switch (table) {
            case 'auth':
                connection.query(`UPDATE public."${table}" SET username='${data.username}', password='${data.password}' WHERE "ID"=${data.id}`, (err, result) => {
                    if (err) {
                        return reject(err)
                    }
                    resolve('Usuario Actualizado')
                })
                break;
        
            case 'user':
                connection.query(`UPDATE public."${table}" SET username='${data.username}', name='${data.name}' WHERE "ID"=${data.id}`, (err, result) => {
                    if (err) {
                        //console.log(err)
                        return reject(err)
                    }
                    //console.log(result)
                    resolve('Usuario Actualizado')
                })
                break;
        }
    })
}

function upsert(table, data) {
    //console.log('upsert: ',data)
   if (data && data.id) {
    //console.log('********Entra update ************** ')
        return update(table, data)
    } else {
        //console.log('********Entra Insert ************** ')
        return insert(table, data)
    }
}

function query(table, query) {
    return new Promise((resolve, reject) => {
        //console.log(query,table)
        switch (table) {
            case 'auth':
                connection.query(`SELECT * FROM ${table} WHERE username='${query.username}'`, (err, res) => {
                    if (err) {
                        //console.log(err)
                        return reject(err)
                    }
                    //console.log(res.rows[0])
                    resolve(res.rows[0] || null)
                })
                break;
        
            case 'user':
                connection.query(`SELECT * FROM ${table} WHERE username='${query.username}'`, (err, res) => {
                    if (err) {
                        //console.log(err)
                        return reject(err)
                    }
                    //console.log(res.rows[0])
                    resolve(res.rows[0] || null)
                })
                break;
            case 'user_follow':
                //console.log('*******************************')
                connection.query(`SELECT f.user_from, f.user_to, u.username, u.name FROM public.user_follow as f INNER JOIN public.user as u ON f.user_to = u."ID" WHERE f.user_from = ${query}`, (err, res) => {
                    if (err) {
                        //console.log(err)
                        return reject(err)
                    }
                    //console.log(res.rows[0])
                    resolve(res.rows || null)
                })
                break;
        }
    })
}

module.exports = {
    list,
    get,
    upsert,
    query
}