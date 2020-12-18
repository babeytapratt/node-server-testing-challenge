const Dog = require('./dogs-model')
const db = require('../../database/dbConfig')

const Penny = { name: 'Penny' }
const Cujo = { name: 'Cujo' }
const Tiny = { name: 'Tiny Puppy' }

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})
beforeEach(async () => {
    await db('dogs').truncate()
})
afterAll(async () => {
    await db.destroy()
})

describe('Dog model', () => {
    it('Dogs.getAll returns empty array if no dogs', async () => {
        const result = await Dog.getAll()
        expect(result).toHaveLength(0)
    })
    it('Dog.getAll returns dogs', async () => {
        await db('dogs').insert(Penny)
        const res = await Dog.getAll()
        expect(res).toHaveLength(1)
        expect(res[0]).toHaveProperty('id')
        expect(res[0]).toHaveProperty('name', 'Penny')
        expect(res[0]).toMatchObject(Penny)
    })
})
