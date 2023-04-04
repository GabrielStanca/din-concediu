import axios from "axios"

export const editCurrentUser = async(editedUserInfo) => {
    try {

        if (!(editedUserInfo.newPassword === editedUserInfo.confirmPassword)) {
            const errors = {"confirmPassword": "newPassword and confirmPassword must match "}
            return errors
        }

        const dataToBeSent = {...editedUserInfo._doc}
        delete dataToBeSent.confirmPassword

        const res = await axios.patch("http://localhost:5001/api/auth/current", dataToBeSent, {withCredentials: true})
        const userToBeReturned = {...res.data._doc};

        delete userToBeReturned.password;

        return userToBeReturned

    }catch (err) {
        console.log(err)
    }
}