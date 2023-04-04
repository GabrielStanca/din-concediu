const Validator = require("validator");
const isEmpty = require("./isEmpty");

const validateRegisterInput = (data) => {
    let errors = {};

    //check name field  
    if (isEmpty(data.firstName)) {
        errors.firstName = "First Name field cannot be empty";
    } else if (!Validator.isLength(data.firstName, { min: 2, max: 30 })) {
        errors.firstName = "First Name must be between 2 and 30 characters long";
    }

    if (isEmpty(data.lastName)) {
        errors.lastName = "Last Name field cannot be empty";
    } else if (!Validator.isLength(data.lastName, { min: 2, max: 30 })) {
        errors.lastName = "Last Name must be between 2 and 30 characters long";
    }

    // check email field
    if (isEmpty(data.email)) {
        errors.email = "Email field cannot be empty";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid.";
    }

    //check password field
    if (isEmpty(data.password)) {
        errors.password = "Password field cannot be empty";
    } else if (!Validator.isLength(data.password, { min: 8, max: 150 })) {
        errors.password = "Password must be between 8 and 150 characters long";
    }

    // check phone field
    if(isEmpty(data.email)) {
        errors.phone = "Phone field should not be empty"
    } else if (!Validator.isMobilePhone(data.phone)){
        errors.phone = "Phone is not valid.";
    }

    return {
        errors,
        isValid: isEmpty(errors),
    }
}

module.exports = validateRegisterInput;