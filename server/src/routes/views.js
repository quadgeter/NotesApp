const express = require('express');
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
const Note = require('../models/Note');
const authMiddleware = require("../middleware/authMiddleware")


const router = express.Router();

router.get('/notes/all', authMiddleware, async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.userId});
        res.json(notes);
    }
    catch (err) {
        console.log("Error finding note")
    }
});

router.post('/notes', authMiddleware, async (req, res) => {
    console.log(req.userId);
    try {
        
        if (!req.userId) {
            return res.status(401).json({ message: "Unauthorized. Please log in." });
        }
        
        const newNote = new Note({
            userId: req.userId, // 🔗 Link note to user
            title: req.body.title,
            body: req.body.body
        });

        newNote.save();
        res.status(200).json({ message: "Note created", newNote });
        console.log("Note created");
    }
    catch(err) {
        res.status(500).json({ message: "An error occured creating your note", error: err.message});
    }
});

router.delete('/notes/:id', authMiddleware, async (req, res) => {
    try {
        const noteId = req.params.id;

        const deletedNote = await Note.findOneAndDelete({ _id: noteId, userId: req.userId });

        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found or you are not authorized to delete it." });
        }

        res.status(200).json({ message: "Note deleted successfully", deletedNote });
    } catch (err) {
        res.status(500).json({ message: "An error occurred while deleting the note", error: err.message });
    }
});

module.exports = router;