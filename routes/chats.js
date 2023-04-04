const express = require("express");
const router = express.Router();
const Chat = require("../models/Chat");
const requiresAuth = require("../middleware/permissions");


// @route       GET /api/chats/connected
// @desc        Get all connections where the target is self
// @access      Private

router.get("/connected", requiresAuth, async (req, res) => {
    try {
        const self = req.body.initiatorId;
        const chats = await Chat.find({targetId: `${self}`})
        return res.json(chats);

    } catch (err) {
        return err
    }
})

// @route       GET /api/chats/byId
// @desc        Get chat by room id
// @access      Private

router.get("/byId", requiresAuth, async (req, res) => {
    try {
        const roomId = req.query.roomId;
        const chat = await Chat.find({roomId: `${roomId}`});
        return res.json(chat);

    } catch (err) {
        return err
    }
})

// @route       GET /api/chats/create
// @desc        Create a chat between target user and self
// @access      Private

router.post("/create", requiresAuth, async (req, res) => {
    try {
        const target = req.body.targetId;
        const self = req.body.initiatorId;
        const roomId = self + target;

        const newChat = new Chat({
            targetId: target,
            initiatorId: self,
            roomId: roomId
        });

        const savedChat = await newChat.save();

        return res.json(savedChat)

    } catch (err) {
        return res.status(500).send(err.message);
    }

});

module.exports = router;