import axios from "axios"

export const getAllChats = async (userData) => {
    try {

        const chats = await axios.get("http://localhost:5001/api/chats/connected", {params: {roomId: userData.roomId},withCredentials:true})

        return chats.data;


    } catch(err) {
        return err.message
    }
};
