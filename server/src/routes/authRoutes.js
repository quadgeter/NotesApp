const User = require('../models/User')
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        console.log(isMatch);
        if (!isMatch) return res.status(400).json({ message: "Invalid Credentials"});

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
    }
    catch(err) {
        res.status(500).json({ message: "An error occured", error: err.message});
    }
    
});

router.post('/register', async (req, res) => {
    try {
        const { username, email, password} = req.body;

        const existingUser = await User.findOne({ email });
        console.log(existingUser);
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({username, email, password: hashedPassword});
        await newUser.save();

        res.status(201).json({ message: "User registered successfully", newUser });
    } catch (err) {
        res.status(500).json({ message: "Error registering user", error: err.message });
    }
});

module.exports = router;