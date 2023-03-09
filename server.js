const express = require("express");
const app = express();
const {Musician} = require("./Musician")
const {sequelize} = require("./db")

const port = 3000;

app.use(express.json())

//TODO
app.get('/musicians', async (req, res) => {
    try {
       const musicians = await Musician.findAll()
       res.status(200).json(musicians)
    } catch (error) {
       console.error(error)
       res.status(404).send('Sorry there are no musicians in our database')
    }
})

app.get('/musicians/:id', async (req, res) => {
    try {
        const musician = await Musician.findByPk(req.params.id)
        res.status(200).json(musician)
    } catch (error) {
        console.error(error)
        res.status(404).send('Sorry there is no musician with that id')
    }
})

//POST 
app.post('/musicians', async (req, res) => {
    try {
        const {name, instrument} = req.body
        await Musician.create({name, instrument})
        console.log('musician successfully created')
        res.status(200).send('musician added')
    } catch(error) {
        res.status(404).send("Sorry, couldn't create musician")
    }
})

//PUT
app.put('/musicians/:id', async (req, res) => {
    try {
        const id = req.params.id
        const foundMusician = await Musician.findByPk(id)
        const newName = req.body.name

        if(foundMusician) {
            await Musician.update({name: newName}, {where: {id}})
            res.status(200).send(`Musicians name successfully changed`)
        }else {
            console.error(error)
        }

    } catch(error) {
        console.error(error)
        res.status(500).send("Cannot change musician")
    }
})


app.listen(port, () => {
    sequelize.sync();
    console.log(`Listening on port ${port}`)
})
