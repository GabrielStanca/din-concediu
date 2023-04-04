import axios from "axios";

export const getCurrentUser = async (data) => {
    try {

        const res = await axios.get("http://localhost:5001/api/auth/current", { params: {disconnect: data}, withCredentials: true});

        return res.data;

    } catch (err) {
        console.log(err)
    }
}