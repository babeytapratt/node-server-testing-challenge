const db = require('../../database/dbConfig')

module.exports = {
    getAll,
    getById,
    insert,
    update,
    remove,
}

function getAll() {
    return db('dogs')
}

function getById(id) {
    return db('dogs').where('id', id).first()
}

async function insert(dog) {
    const [ id ] = await db('dogs').insert(dog)
    return db('dogs').where({ id }).first()
}

async function update(dog) {
    return(dog)
}

function remove(dog) {
    return(dog)
}
