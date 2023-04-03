import axios from "axios";

const bcrypt = require("bcryptjs");

export const registerUserService = async (user) => {
    try {
        let userToSend = {...user};
        userToSend.password = await bcrypt.hash(userToSend.password, 12)
        userToSend.confirmPassword = await bcrypt.hash(userToSend.confirmPassword, 12)

        const response = await axios.post("http://localhost:5001/api/auth/register", userToSend, {
            header: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
