// Import dependencies
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

// Initialize app
const app = express();

// Enable CORS (VERY IMPORTANT for frontend requests)
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Secret key for JWT (for demo only)
const SECRET = "mysecretkey";


// --------------------
// Health Check Endpoint
// --------------------
app.get('/', (req, res) => {
    res.send('Auth Service is running');
});


// --------------------
// Login Endpoint (FAKE AUTH)
// --------------------
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Validate input exists
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password required" });
    }

    // Very simple check (fake login)
    if (email === "test@test.com" && password === "123") {

        // Create token
        const token = jwt.sign(
            { userId: "user123" }, // payload
            SECRET,
            { expiresIn: "1h" }
        );

        return res.json({ token });
    }

    // Invalid credentials
    return res.status(401).json({ error: "Invalid credentials" });
});


// --------------------
// Start Server
// --------------------
const PORT = process.env.PORT || 8080;

// Required for Cloud Run
app.listen(PORT, () => {
    console.log(`Auth Service running on port ${PORT}`);
});