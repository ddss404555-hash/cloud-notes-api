// Import required libraries
const express = require('express');
const { Firestore } = require('@google-cloud/firestore');

// Initialize Express app
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Initialize Firestore client
// In Cloud Run, authentication is handled automatically
const db = new Firestore();

// Reference to 'notes' collection in Firestore
const notesCollection = db.collection('notes');


// --------------------
// Health Check Endpoint
// --------------------
app.get('/', (req, res) => {
    res.send('Notes Service is running');
});


// --------------------
// Create a new note
// --------------------
app.post('/notes', async (req, res) => {
    try {
        const { text } = req.body;

        // Validate input
        if (!text) {
            return res.status(400).json({ error: 'Text is required' });
        }

        // Add note to Firestore
        const docRef = await notesCollection.add({
            text,
            createdAt: new Date()
        });

        // Return success response
        res.status(201).json({
            id: docRef.id,
            message: 'Note created'
        });

    } catch (error) {
        // Log error for debugging (important for observability)
        console.error(error);

        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// --------------------
// Get all notes
// --------------------
app.get('/notes', async (req, res) => {
    try {
        const snapshot = await notesCollection.get();

        // Transform Firestore documents into JSON
        const notes = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        res.json(notes);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// --------------------
// Start Server
// --------------------
const PORT = process.env.PORT || 8080;

// Cloud Run requires listening on PORT environment variable
app.listen(PORT, () => {
    console.log(`Notes Service running on port ${PORT}`);
});