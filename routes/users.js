const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");
const requiresAuth = require("../middleware/permissions")

// @route       GET /api/users/all
// @desc        Get all users from db
// @access      Private

router.get("/all", requiresAuth, async (req,res) => {
    try {
        const users = await User.find().exec();
        users.forEach(user => {
            delete user._doc.password
        })

        res.json(users);

    } catch(error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})

module.exports = router;