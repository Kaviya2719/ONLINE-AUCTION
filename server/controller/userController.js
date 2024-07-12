import User from "../model/userModel.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const create = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "User already exists" });
        }
        const newUser = new User({ name, email, password });
        const savedUser = await newUser.save();
        res.status(201).json({ message: "User created successfully", user: savedUser });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ email: user.email, userId: user._id }, JWT_SECRET, { expiresIn: '24h' });

        res.status(200).json({
            message: "Login successful",
            token: token
        });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const userData = await User.find();
        if (!userData || userData.length === 0) {
            res.status(404).json({ message: "User data not found" });
        }
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};
