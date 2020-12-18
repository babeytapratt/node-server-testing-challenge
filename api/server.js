const express = require("express");

const Dogs = require("./dogs/dogs-model");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get("/dogs", (req, res) => {
  Dogs.getAll()
    .then(dogs => {
      res.status(200).json(dogs);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.get('/dogs/:id', async (req, res) => {
    const dog = await Dogs.getById(req.params.id)
    if (!dog) {
        res.status(400).end()
    } else {
        res.json(dog)
    }
});

server.post('/dogs', async (req, res) => {
    const newDog = await Dogs.insert(req.body)
    res.json(newDog)
});

server.delete('/dogs/:id', (req, res) => {
    const { id } = req.params
    Dogs.remove(id)
    .then(deleted => {
        if (deleted) {
            res.json({ removed: deleted })
        } else {
            res.status(404).end()
        }
    })
})
