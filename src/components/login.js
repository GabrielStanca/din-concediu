import React from "react";
import '../style/login.css'
import '../App.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faEnvelope,faLock } from '@fortawesome/free-solid-svg-icons'

const Login= ()=> {
    return (
        <div className="login_container">
            <form>
                <h1>Login</h1>
                <div className="login_input">
                    <label htmlFor="email"> <FontAwesomeIcon icon={faEnvelope} /></label>
                    <input name="email"  id="email" type="email" required title placeholder="Type your email" onChange={(e)=>{
                        console.log(e.target.value)
                    }}/>
                </div>
                <div className="login_input">
                    <label htmlFor="password"> <FontAwesomeIcon icon={faLock} /></label>
                    <input name="password" required id="password" type="password" placeholder="Type you password" onChange={(e)=>{
                        console.log(e.target.value)
                    }}/>
                </div>
                <span className="login_forgot-password"><a href="#">Forgot password</a></span>

                <button className="login_login-button" type={"submit"} onChange={event => console.log(event)}>Login</button>
            </form>


        </div>
    );
}

export default Login;
