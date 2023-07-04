const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");
require("dotenv").config();

const UserController = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;

            // Check if the email is already registered
            const existingUser = await UserModel.findOne({ email });
            if (existingUser) {
                return res
                    .status(400)
                    .json({ message: "Email is already registered" });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user
            const user = await UserModel.create({
                name,
                email,
                password: hashedPassword,
            });

            // Generate JWT token
            const token = jwt.sign(
                { userId: user._id },
                process.env.SECRET_KEY
            );

            // Return the user and token
            res.status(201).json({ user, token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Check if the email is registered
            const user = await UserModel.findOne({ email });
            if (!user) {
                return res
                    .status(400)
                    .json({ message: "Invalid email or password" });
            }

            // Compare the password
            const isPasswordValid = await bcrypt.compare(
                password,
                user.password
            );
            if (!isPasswordValid) {
                return res
                    .status(400)
                    .json({ message: "Invalid email or password" });
            }

            // Generate JWT token
            const token = jwt.sign(
                { userId: user._id },
                process.env.SECRET_KEY
            );

            // Return the user and token
            res.json({ user, token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
};

module.exports = UserController;
