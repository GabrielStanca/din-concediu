import axios from "axios";

export const getAllUsers = async () => {
    try {
        const res = await axios.get("http://localhost:5001/api/users/all", {withCredentials: true});

        return res.data;

    } catch (err) {
        console.log(err)
    }
}