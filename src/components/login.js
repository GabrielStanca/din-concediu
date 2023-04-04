import React, {useState} from "react";
import '../style/user-connection.css'
import '../App.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons'
import {loginUserService} from "../services/login.service";

const Login = () => {

    const [loginCredentials, setLoginCredentials] = useState({
        email: "",
        password: "",
    });

    return (
        <div className="login_container">
            <form onSubmit={async (e) => {
                e.preventDefault()
                try {
                    const data = await loginUserService(loginCredentials);
                    if(data) {
                        document.location.href= `/chat?id=${data.user._id}`
                    }
                } catch (error) {
                    console.error(error);
                }
            }}
            >
                <h1>Login</h1>
                <div className="login_input">
                    <label htmlFor="email"> <FontAwesomeIcon icon={faEnvelope}/></label>
                    <input name="email" id="email" type="email" required title placeholder="Type your email"
                           onChange={(e) => {
                               setLoginCredentials({...loginCredentials, email: e.target.value})
                           }}
                    />
                </div>
                <div className="login_input">
                    <label htmlFor="password"> <FontAwesomeIcon icon={faLock}/></label>
                    <input name="password" required id="password" type="password" placeholder="Type you password"
                           onChange={(e) => {
                               setLoginCredentials({...loginCredentials, password: e.target.value})
                           }}
                    />
                </div>
                <span className="login_forgot-password"><a href="/forgot-password">Forgot password</a></span>
                <button className="login_login-button" type={"submit"}>Login</button>
            </form>


        </div>
    );
}

export default Login;
