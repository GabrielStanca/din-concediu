import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "../style/user-connection.css"
import {faEnvelope, faLock, faUserTie, faPhone} from "@fortawesome/free-solid-svg-icons";




const Register= ()=> {

    const [registerUser, setRegisterUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: 0,
        password: ""
    })

    return (
        <div className="register_container">
            <form onSubmit={(e)=>{
                e.preventDefault()
                console.log(registerUser)}}>
                <h1>Register</h1>
                <div className="register_input">
                    <label htmlFor="firstName"> <FontAwesomeIcon icon={faUserTie} /></label>
                    <input name="firstName"  id="firstName" type="text" required title placeholder="Type your First Name" onChange={(e)=>{
                        console.log(e.target.value)
                    }}/>
                </div>
                <div className="register_input">
                    <label htmlFor="lastName"> <FontAwesomeIcon icon={faUserTie} /></label>
                    <input
                        name="lastName"
                        id="lastName"
                        type="text"
                        required
                        title
                        placeholder="Type your Last Name"
                        onChange={(e)=>{
                            setRegisterUser({...registerUser, firstName: e.target.value })
                        console.log(e.target.value)
                    }}
                    />
                </div>
                <div className="register_input">
                    <label htmlFor="phoneNumber"> <FontAwesomeIcon icon={faPhone} /></label>
                    <input name="phoneNumber"  id="phoneNumber" type="tel" pattern="[+]{1}[0-9]{11,14}" required title placeholder="Type your Phone Number"
                           onChange={(e)=>{
                               setRegisterUser({...registerUser, lastName: e.target.value })
                               console.log(e.target.value)
                           }}
                    />
                </div>
                <div className="register_input">
                    <label htmlFor="email"> <FontAwesomeIcon icon={faEnvelope} /></label>
                    <input name="email"  id="email" type="email" required title placeholder="Type your email" onChange={(e)=>{
                        console.log(e.target.value)
                    }}/>
                </div>
                <div className="register_input">
                    <label htmlFor="password"> <FontAwesomeIcon icon={faLock} /></label>
                    <input name="password" required id="password" type="password" placeholder="Type you password" onChange={(e)=>{
                        console.log(e.target.value)
                    }}/>
                </div>
                <div className="register_input">
                    <label htmlFor="confirmPassword"> <FontAwesomeIcon icon={faLock} /></label>
                    <input name="confirmPassword" required id="confirmPassword" type="password" placeholder="Confirm your password" onChange={(e)=>{
                        console.log(e.target.value)
                    }}/>
                </div>

                <button className="register_save-button" type={"submit"} onChange={(event) =>{
                    event.preventDefault();
                    console.log(event)
                } }>Save</button>
            </form>
        </div>
    );
}

export default Register;
