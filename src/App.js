import React from "react";
import './App.css';
import Login from "./components/login";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Home from "./components/home";
import About from "./components/about";
import Register from "./components/register";
import ForgotPassword from "./components/forgot-password";
import {GlobalProvider} from "./context/GlobalContext";
import logo from "./logo.svg";
import Chat from "./components/chat";

function App() {
    return (
        <GlobalProvider>
            <div className="App">
                <Router>
                    <nav>
                        <div className="navigation_logo">
                        <header className="App-header">
                            <img src={logo} className="App-logo" alt="logo" />
                        </header>
                    </div>
                    <div className="navigation_links">
                        <Link to="/"><span>Home</span></Link>
                        <Link to="/about"><span>About</span></Link>
                        <Link to="/login"><span>Login</span></Link>
                        <Link to="/register"><span>Register</span></Link>
                    </div>

                </nav>
                    <Routes>
                        <Route path="" exact element={<Home/>}/>
                        <Route path="/login" exact element={<Login/>}/>
                        <Route path="/about" exact element={<About/>}/>
                        <Route path="/register" exact element={<Register/>}/>
                        <Route path="/forgot-password" exact element={<ForgotPassword/>}/>
                    <Route path="/chat" exact element={<Chat />}/>
                    </Routes>
                </Router>

            </div>
        </GlobalProvider>
    );
}

export default App;
