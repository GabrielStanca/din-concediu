import axios from "axios";

export const loginUserService = async (user) => {
    try {
        let userToSend = {...user};

        const response = await axios.post("http://localhost:5001/api/auth/login", userToSend, {
            header: {
                'Content-Type': 'application/json'
            }
        });

        document.cookie = `access-token=${response.data.token}; expires=${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)}; httpOnly=true`;


        return response.data;
    } catch (error) {
        console.error(error);
    }
}
