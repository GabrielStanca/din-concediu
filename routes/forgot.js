const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const validateForgotPass = require("./validation/forgotPassValidation");

// @route       GET /api/forgot
// @desc        Reset password with secret
// @access      Public

router.post("/", async (req,res) => {
    try {

        const {errors, isValid} = validateForgotPass(req.body);
        if (!isValid) {
            return res.status(400).json(errors)
        }

        // Check for user
        const userByEmail = await User.findOne({
            email: new RegExp("^" + req.body.email + "$", "i")
        });

        if(!userByEmail) {
            errors.email = "There is no user with this email"
            return errors
        }

        const isCorrectSecret = await bcrypt.compare(
            req.body.secret,
            userByEmail.secret
        );

        if(!isCorrectSecret){
            return res.status(401).send("This is not your secret")
        }

        userByEmail.password = await bcrypt.hash("P@sSw0Rd123", 12)

        return res.json({
            Password: "P@sSw0Rd123"
        })
    } catch(error) {
        console.error(error.message);
    }
})

module.exports = router;