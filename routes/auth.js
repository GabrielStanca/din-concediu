const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// @route       GET /api/auth/test
// @desc        Test auth route
// @access      Public

router.get("/test", (req, res) => {
    res.send("Auth route works");
});


// @route       GET /api/auth/register
// @desc        Create new user
// @access      Public

router.post("/register", async (req, res) => {
    try {
        // Hash pass
        const hasedPassword = await bcrypt.hash(req.body.password, 12);

        // Create new user
        const newUser = new User({
            email: req.body.email,
            password: hasedPassword,
            name: req.body.name
        });

        // Save user to db 
        const savedUser = await newUser.save();

        // Return the new user
        return res.json(savedUser);
    }
    catch(err) {
        console.log(err);
        res.status(500).send(err.message);
    }
});

module.exports = router;