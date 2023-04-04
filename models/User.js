const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        gender : {
            type: String,
            required: false,
        },
        birthDate: {
            type: String,
            required: false,
        },
        description: {
            type: String,
            required: false,
        },
        secret: {
            type: String,
            required: true,
        },
        profilePic: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
);

//export model

const User = model("User", UserSchema);
module.exports = User;