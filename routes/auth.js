const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const validateRegisterInput = require("./validation/registerValidation");
const jwt = require("jsonwebtoken");
const requiresAuth = require("../middleware/permissions")


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

        const { errors, isValid } = validateRegisterInput(req.body);
        if (!isValid) {
            return res.status(400).json(errors)
        }

        // Check for user
        const existingEmail = await User.findOne({
            email: new RegExp("^" + req.body.email + "$", "i")
        });

        if (existingEmail) {
            return res
                .status(400)
                .json({ error: "There is already a user with this email" });
        }

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

        // Deleting the password from the object that is returned to the user
        const userToReturn = { ...savedUser._doc };
        delete userToReturn.password;

        // Return the new user
        return res.json(userToReturn);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
});


// @route       POST /api/auth/login
// @desc        Login user and return access token
// @access      Public

router.post("/login", async (req, res) => {
    try {
        // Check for user
        const user = await User.findOne({
            email: new RegExp("^" + req.body.email + "$", "i")
        });

        if (!user) {
            return res.
                status(400).
                json({ error: "There was a problem with your login credentials" });
        }

        const passwordMatch = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!passwordMatch) {
            return res.
                status(400).
                json({ error: "There was a problem with your login credentials" });
        }

        const payload = { userId: user._id };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });

        res.cookie("access-token", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days in milliseconds
            httpOnly: true,
            secure: process.env.NODE_ENV === "production"
        });

        const userToReturn = { ...user._doc };
        delete userToReturn.password;

        return res.json({
            token: token,
            user: userToReturn
        })

    } catch (err) {
        console.log(err);
        return res.status(500).send(err.message);
    }
});


// @route       GET /api/auth/current
// @desc        Return current authed user
// @access      Private

router.get("/current", requiresAuth, (req, res) => {
    if(!req.user) {
        return res.status(401).send("Unauthorized");
    }

    return res.json(req.user);
    
})

module.exports = router;