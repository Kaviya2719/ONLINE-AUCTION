import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const JWT_SECRET = process.env.JWT_SECRET; // Access JWT secret from environment variables

const jsontoken = (req, res, next) => {
    // Get token from header
    const token = req.headers.authorization;

    // Check if token is present
    if (!token) {
        return res.status(401).json({ message: "Unauthorized access" });
    }

    try {
        // Verify token
        const decodedToken = jwt.verify(token.split(' ')[1], JWT_SECRET);
        req.userData = decodedToken; // Attach user data to request object
        next(); // Continue to next middleware or route handler
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

export default jsontoken;
