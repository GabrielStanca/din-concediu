import React, {useEffect, useState} from "react";
import './App.css';
import Login from "./components/login";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Home from "./components/home";
import About from "./components/about";
import Register from "./components/register";
import ForgotPassword from "./components/forgot-password";
import Profile from "./components/profile";
import {GlobalProvider, useGlobalContext} from "./context/GlobalContext";
import TB_transparent from "../src/images/TB_transparent.svg"
import Chat from "./components/chat";
import {faBars, faLock, faCircleDot, faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {getCurrentUser} from "./services/getCurrentUser"

function App() {
    const [showNavigationMobile, setShowNavigationMobile] = useState(false)
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const userData = await getCurrentUser();
            setUser(userData);
        }
        fetchData();
    }, []);

    async function handleDisconnect() {
        await getCurrentUser(true);
        setUser(null);
    }

    return (
        <GlobalProvider>
            <div className="App">
                <Router>
                    <nav>
                        <div className="navigation_logo">
                            <img src={TB_transparent} alt="logo"/>
                        </div>
                        <button className="navigation_links_mobile"
                                onClick={() => {
                                    if (showNavigationMobile)
                                        setShowNavigationMobile(false)
                                    else setShowNavigationMobile(true)
                                }}>
                            <FontAwesomeIcon icon={faBars}/>
                        </button>
                        <div className="navigation_links">
                            <Link to="/"><span>Home</span></Link>
                            {
                                user ? (
                                    <>
                                        <Link to="/chat"><span>Chat</span></Link>
                                        <Link to="/profile"><span>Profile</span></Link>
                                        <Link to = "/login"><button style={{background:"transparent", border: 0}} onClick={handleDisconnect}><FontAwesomeIcon style={{cursor:"pointer"}} icon={faRightFromBracket} /></button></Link>
                                    </>

                                ) : (
                                    <>
                                        {console.log(user)}
                                        <Link to="/login"><span>Login</span></Link>
                                        <Link to="/register"><span>Register</span></Link>
                                    </>
                                )
                            }
                        </div>

                    </nav>
                    <div className={`navigation_container_mobile ${showNavigationMobile ? "active_menu" : ""}`}>
                        <Link to="/"><span>Home</span></Link>
                        {!user ? (
                            <>
                                <Link to="/login"><span>Login</span></Link>
                                <Link to="/register"><span>Register</span></Link>
                            </>
                        ) : (
                            <Link to="/profile"><span>Profile</span></Link>
                        )}


                    </div>
                    <Routes>
                        <Route path="" exact element={<Home/>}/>
                        <Route path="/login" exact element={<Login/>}/>
                        <Route path="/about" exact element={<About/>}/>
                        <Route path="/register" exact element={<Register/>}/>
                        <Route path="/forgot-password" exact element={<ForgotPassword/>}/>
                        <Route path="/profile" exact element={<Profile/>}/>
                        <Route path="/chat" exact element={<Chat/>}/>
                    </Routes>
                </Router>

            </div>
        </GlobalProvider>
    );
}

export default App;
