import axios from "axios"

export const createChat = async (chatData) => {
    try {

        const target = chatData.targetId;
        const self = chatData.initiatorId;
        const roomId1 = self + target;
        const roomId2 = target + self;

        const existingChatOne = await axios.get("http://localhost:5001/api/chats/byId", {
            params: {roomId: roomId1}, withCredentials: true
        });

        console.log('Chat 1', existingChatOne.data)

        const existingChatTwo = await axios.get("http://localhost:5001/api/chats/byId", {
            params: {roomId: roomId2}, withCredentials: true
        });

        console.log("Chat 2", existingChatTwo.data)

        if (existingChatOne.data.length > 0) {
            // if an existing chat is found with the first room ID, return the chat object
            return {...existingChatOne.data[0]};
        }

        if (existingChatTwo.data.length > 0) {
            // if an existing chat is found with the second room ID, return the chat object
            return {...existingChatTwo.data[0]};
        }
        // if no chat exists, create a new one and return the chat object

        const payload = {
            targetId: target,
            initiatorId: self
        }

        const newChat = await axios.post("http://localhost:5001/api/chats/create", payload, {withCredentials: true});

        return {...newChat.data};


    } catch
        (err) {
        console.error(err);
        return err.message
    }
}