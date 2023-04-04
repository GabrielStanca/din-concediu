const {Schema, model} = require("mongoose");

const ChatSchema = new Schema({
        initiatorId: {
            type: String,
            required: true
        },
        targetId: {
            type: String,
            required: true
        },
        roomId: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

// exporting chat model
const Chat = model("Chat", ChatSchema);
module.exports = Chat;