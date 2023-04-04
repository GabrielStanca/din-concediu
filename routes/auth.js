const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const validateRegisterInput = require("./validation/registerValidation");
const jwt = require("jsonwebtoken");
const requiresAuth = require("../middleware/permissions")
const validateEditInput = require("./validation/editValidation")

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

        const {errors, isValid} = validateRegisterInput(req.body);
        if (!isValid) {
            return res.status(400).json(errors)
        }

        // Check for user
        const existingEmail = await User.findOne({
            email: new RegExp("^" + req.body.email + "$", "i")
        });

        if (existingEmail) {
            errors.email = "There is already a user with this email"
            return res
                .status(400)
                .json(errors);
        }

        // Create new user
        const newUser = new User({
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            secret: req.body.secret,
            imageUser: req.body.imageUser || ""
        });

        // Save user to db 
        const savedUser = await newUser.save();

        // Deleting the password from the object that is returned to the user
        const userToReturn = {...savedUser._doc};
        delete userToReturn.password;

        // Return the new user
        return res.json(userToReturn);
    } catch (err) {
        return res.status(500).send(err.message);
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
            return res.status(400).json({error: "There was a problem with your login credentials."});
        }

        const passwordMatch = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(400).json({error: "There was a problem with your login credentials."});
        }

        const payload = {userId: user._id};

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });

        res.cookie("access-token", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days in milliseconds
            httpOnly: true,
            secure: process.env.NODE_ENV === "production"
        });

        const userToReturn = {...user._doc};
        delete userToReturn.password;

        return res.json({
            token: token,
            user: userToReturn
        })

    } catch (err) {
        return res.status(500).send(err.message);
    }
});


// @route       GET /api/auth/current
// @desc        Return current authed user
// @access      Private

router.get("/current", requiresAuth, (req, res) => {
    if (!req.user) {
        return res.status(401).send("Unauthorized");
    }

    if(req.query.disconnect  === "true") {
        res.clearCookie("access-token");
        return res.status(200).send("User disconnected");
    }
    return  res.status(200).json(req.user);

})


// @route       DELETE /api/auth/current
// @desc        Delete the logged-in user
// @access      Private

router.patch("/current", requiresAuth, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).send("Unauthorized");
        }

        const userId = jwt.decode(req.cookies["access-token"]).userId
        const currentUser = await User.findById(userId);
        const userData = req.body;
        let userToBeSent = {...userData};

        if (!currentUser) {
            return res.status(404).send("User not found")
        }

        if (userData.oldPassword) {

            const passwordMatch = await bcrypt.compare(
                userData.oldPassword,
                currentUser.password
            );

            if (!passwordMatch) {
                return res.status(400).send("Bad credentials")
            }

            userToBeSent.newPassword = await bcrypt.hash(userToBeSent.newPassword, 12);
            delete userToBeSent.oldPassword;
            delete userToBeSent.confirmPassword;

            userToBeSent = {
                password: userToBeSent.newPassword
            }

            console.log(userToBeSent)

        } else {

            const {errors, isValid} = validateEditInput(userData);
            if (!isValid) {
                return res.status(400).json(errors)
            }
        }

        const updatedUser = await User.findByIdAndUpdate(userId, userToBeSent, {
            new: true, // return the updated document instead of the original
            runValidators: true, // validate the update against the model's schema
        });

        res.json(updatedUser);


    } catch (err) {
        res.status(500).send("Server Error");
    }
})

router.delete("/current", requiresAuth, async (req, res) => {
    try {
        const userId = jwt.decode(req.cookies["access-token"]).userId

        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).send("User not found");
        }

        res.clearCookie("access-token"); // clear the access-token cookie
        res.send("User deleted successfully");

    } catch (err) {
        res.status(500).send("Server Error");
    }
})

module.exports = router;