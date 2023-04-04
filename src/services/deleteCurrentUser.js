import axios from "axios"

export const deleteCurrentUser = async () => {
    try {
        const res = await axios.delete("http://localhost:5001/api/auth/current", {withCredentials: true})
        return res.data;

    }catch (err) {
        console.log(err)
    }
}