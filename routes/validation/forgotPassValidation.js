const Validator = require("validator");
const isEmpty = require("./isEmpty");

const validateForgotPass = (data) => {
    let errors = {};

    // check email field
    if (isEmpty(data.email)) {
        errors.email = "Email field cannot be empty";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid.";
    }

    // check email field
    if (isEmpty(data.email)) {
        errors.email = "Secret field cannot be empty";
    }

    return {
        errors,
        isValid: isEmpty(errors),
    }

};

module.exports = validateForgotPass;