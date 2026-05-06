const express = require('express');
const cors = require('cors');
const { Firestore } = require('@google-cloud/firestore');
const authMiddleware = require('./authMiddleware');

const app = express();

app.use(cors());
app.use(express.json());

const db = new Firestore();
const notesCollection = db.collection('notes');


// --------------------
// Health Check
// --------------------
app.get('/', (req, res) => {
    res.send('Notes Service is running');
});


// --------------------
// Get Notes (FIXED)
// --------------------
app.get('/notes', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.userId;

        const snapshot = await notesCollection
            .where('userId', '==', userId)
            .get(); // ✅ REMOVED orderBy (this was causing 500)

        const notes = [];
        snapshot.forEach(doc => {
            notes.push({
                id: doc.id,
                ...doc.data()
            });
        });

        res.json(notes);

    } catch (error) {
        console.error("GET /notes ERROR:", error);
        res.status(500).json({ error: error.message });
    }
});


// --------------------
// Create Note
// --------------------
app.post('/notes', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.userId;
        const { content } = req.body;

        if (!content || content.trim() === "") {
            return res.status(400).json({ error: "Content required" });
        }

        const newNote = {
            content,
            userId,
            createdAt: new Date()
        };

        const docRef = await notesCollection.add(newNote);

        res.json({ id: docRef.id, ...newNote });

    } catch (error) {
        console.error("POST /notes ERROR:", error);
        res.status(500).json({ error: error.message });
    }
});


// --------------------
// Update Note
// --------------------
app.put('/notes/:id', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.userId;
        const { content } = req.body;
        const noteId = req.params.id;

        const docRef = notesCollection.doc(noteId);
        const doc = await docRef.get();

        if (!doc.exists) {
            return res.status(404).json({ error: "Note not found" });
        }

        if (doc.data().userId !== userId) {
            return res.status(403).json({ error: "Unauthorized" });
        }

        await docRef.update({ content });

        res.json({ message: "Note updated" });

    } catch (error) {
        console.error("PUT /notes ERROR:", error);
        res.status(500).json({ error: error.message });
    }
});


// --------------------
// Delete Note
// --------------------
app.delete('/notes/:id', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.userId;
        const noteId = req.params.id;

        const docRef = notesCollection.doc(noteId);
        const doc = await docRef.get();

        if (!doc.exists) {
            return res.status(404).json({ error: "Note not found" });
        }

        if (doc.data().userId !== userId) {
            return res.status(403).json({ error: "Unauthorized" });
        }

        await docRef.delete();

        res.json({ message: "Note deleted" });

    } catch (error) {
        console.error("DELETE /notes ERROR:", error);
        res.status(500).json({ error: error.message });
    }
});


// --------------------
const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
    console.log(`Notes Service running on port ${PORT}`);
});