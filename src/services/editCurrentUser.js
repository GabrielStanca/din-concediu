import axios from "axios"

export const editCurrentUser = async(editedUserInfo) => {
    try {
        const res = await axios.patch("http://localhost:5001/api/auth/current", editedUserInfo, {withCredentials: true})
        const userToBeReturned = {...res.data._doc};
        delete userToBeReturned.password;

        return userToBeReturned

    }catch (err) {
        console.log(err)
    }
}