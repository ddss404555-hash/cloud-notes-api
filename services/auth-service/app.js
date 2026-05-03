// Import Express framework
const express = require('express');

// Initialize app
const app = express();


// --------------------
// Health Check Endpoint
// --------------------
app.get('/', (req, res) => {
    res.send('Auth Service is running');
});


// --------------------
// Dummy User Endpoint
// --------------------
// This simulates authentication by returning a fixed user
// No real authentication logic is implemented (kept simple intentionally)
app.get('/user', (req, res) => {
    res.json({
        user_id: "123",
        name: "Test User"
    });
});


// --------------------
// Start Server
// --------------------
const PORT = process.env.PORT || 8080;

// Required for Cloud Run
app.listen(PORT, () => {
    console.log(`Auth Service running on port ${PORT}`);
});