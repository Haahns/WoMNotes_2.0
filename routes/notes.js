
const express = require('express')
const router = express.Router()
const Note = require('../models/note')

router.get('/', async (req, res) => {
    try {
        const notes = await Note.find()
        res.send(notes)
    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
}) 

router.get('/:id', async (req, res) => {
    try {
        const note = await Note.findOne({ _id: req.params.id })
        if (!note) {
            return res.status(404).send({msg: "Note not found."})
        }
        res.send(note)
    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
}) 

router.post('/', async (req, res) => {
    try {

        // note är en instans av vår Note-model
        const note = new Note({
            text: req.body.text
        })
        // vi sparar vår note i databasen och tar emot svaret i newNote
        const newNote = await note.save()

        res.send({ sparade: newNote})

    } catch (error) {
        res.status(500).send({ msg: error.message })
    }

})

module.exports = router
