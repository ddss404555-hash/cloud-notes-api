const jwt = require('jsonwebtoken');

// Same secret used in auth-service
const SECRET = "mysecretkey";

function authMiddleware(req, res, next) {
    // Get token from header
    const authHeader = req.headers.authorization;

    // Check if header exists
    if (!authHeader) {
        return res.status(401).json({ error: "No token provided" });
    }

    // Expected format: "Bearer <token>"
    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Invalid token format" });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, SECRET);

        // Attach user info to request
        req.user = decoded;

        next(); // continue to route
    } catch (err) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
}

module.exports = authMiddleware;