const express = require('express');
const router = express.Router();
const User = require('../models/users');

router.post("/login", async (req, res) => {
    try {
        const { email, password, loginMode } = req.body;

        if (!email || !loginMode) {
            return res.status(400).json({
                success: false,
                message: "Email and loginMode are required"
            });
        }

        if (loginMode === "email") {
            const user = await User.findOne({ email, loginMode: "email" });
            if (!user || user.password !== password) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid email or password"
                });
            }
            return res.json({
                success: true,
                message: "Login successful (email mode)"
            });
        }
        if (loginMode === "github") {
            const user = await User.findOne({ email, loginMode: "github" });
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "GitHub user not found",
                });
            }

            return res.json({
                success: true,
                message: "Login successful (GitHub mode)"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error occured"
        });
    }
});

module.exports = router;