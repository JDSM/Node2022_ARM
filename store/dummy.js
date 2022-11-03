const db = {
    user: [
        {
            id: '1',
            name: 'Daniel'
        }
    ]
}

async function list (table) {
    return db[table] || []
}

async function get (table, id) {
    let col = await list(table)
    return col.filter(item => item.id === id)[0] || null
}

async function upsert (table, data) {
    //console.log (data)
    if (!db[table]) {
        db[table] = [];
    }

    db[table].push(data);
    //console.log (db)
}

async function remove (table, id) {
    return true
}

async function query (table, select) {
    let col = await list (table)
    let keys = Object.keys(select)
    let key = keys[0]
    return col.filter(item => item[key] === select[key])[0] || null
}

module.exports = {
    list,
    get,
    upsert,
    remove,
    query
}