const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "Access denied" });

        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId; // Extract userId from JWT
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
};