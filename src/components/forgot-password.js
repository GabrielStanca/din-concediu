import React from "react";
import "../style/user-connection.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faPhone} from "@fortawesome/free-solid-svg-icons";

const ForgotPassword= ()=> {
    return (
        <div className="forgot-password_container">
            <form>
                <h1>Forgot Password</h1>
                <div className="forgot-password_input">
                    <label htmlFor="email"> <FontAwesomeIcon icon={faEnvelope} /></label>
                    <input name="email"  id="email" type="email" required title placeholder="Type your email" onChange={(e)=>{
                        console.log(e.target.value)
                    }}/>
                </div>
                <div className="forgot-password_input">
                    <label htmlFor="phoneNumber"> <FontAwesomeIcon icon={faPhone} /></label>
                    <input name="phoneNumber"  id="phoneNumber" type="tel" pattern="[+]{1}[0-9]{11,14}" required title placeholder="Type your Phone Number" onChange={(e)=>{
                        console.log(e.target.value)
                    }}/>
                </div>
                <span className="forgot-password_phone">Enter thse phone number that finish with **** *** 232</span>
                <button className="forgot-password_button" type={"submit"} onChange={event => console.log(event)}>Submit</button>

            </form>

        </div>
    );
}

export default ForgotPassword;
