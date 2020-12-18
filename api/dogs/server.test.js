const request = require('supertest')
const server = require('../server')
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

describe('endpoints', () => {
    describe('[GET] /dogs', () => {
        it('responds with 200 OK', async () => {
            const res = await request(server).get('/dogs')
            expect(res.status).toBe(200)
        })
    })
    it('responds with empty array if no', async () => {
        const res = await request(server).get('/dogs')
        expect(res.body).toHaveLength(0)
    })
    it('responds with dogs if dogs', async () => {
        await db('dogs').insert(Penny)
        let res = await request(server).get('/dogs')
        expect(res.body).toHaveLength(1)
        await db('dogs').insert(Cujo)
        res = await request(server).get('/dogs')
        expect(res.body).toHaveLength(2)
        expect(res.body[0]).toMatchObject(Penny)
        expect(res.body[1]).toMatchObject(Cujo)
    })

    describe('[GET] /dogs/:id', () => {
        it('responds with the dog with the given id', async () => {
          await db('dogs').insert(Penny)
          let res = await request(server).get('dogs/1')
          expect(res.body).toMatchObject(Sam)
        })
        it('responds with a 404 if id not in db', async () => {
          const response = await request(server).g('/ dogs/1')
          expect(response.status).toBe(404)
        })
    })
    describe('[POST] /dogs', () => {
        it('returns the newly created dog', async () => {
            const res = await request(server).post('/dogs').send(Tiny);
            expect(res.body.id).toBe(1);
            expect(res.body.name).toBe('Sam');
        })
        it('if we add same dog twice responds with "not cool"', async () => {
            await request(server).post('/dogs').send(Tiny);
            const res = await request(server).post('/dogs').send(Tiny);
            expect(JSON.stringify(res.body)).toMatch(/not cool/)
        })
    })
    describe('[PUT] /dogs/:id', () => {
        it('updates a dog', async () => {
            const res = await request(server).put('/dogs/:id').update(Cujo.name)
            expect(res.status).toBe(201)
            expect(res.body.name).not.toBe('Cujo')
        })
    })
    describe('[DELETE] /dogs/:id', () => {
        it('deletes a dog', async () => {
            const res = await request(server).delete('/dogs/:id').delete(Penny)
            expect(res.body.name).not.toContain('Penny')
        })
    })
})
