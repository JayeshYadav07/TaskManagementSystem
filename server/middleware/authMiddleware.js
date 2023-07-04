const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");
require("dotenv").config();

const authMiddleware = async (req, res, next) => {
    // Get the token from the request headers
    const token = req.headers.authorization;

    // Check if token exists
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        // check is token is expired or not
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const { userId } = decoded;

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;
