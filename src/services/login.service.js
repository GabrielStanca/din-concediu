import axios from "axios";

export const loginUserService = async (user) => {
    try {
        let userToSend = {...user};

        const response = await axios.post("http://localhost:5001/api/auth/login", user, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true // add this to send cookies with the request
        });
        const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        document.cookie = `access-token=${response.data.token}; expires=${expires.toUTCString()}; path=/; HttpOnly`;


        return response.data;
    } catch (error) {
        console.error(error);
    }
}
