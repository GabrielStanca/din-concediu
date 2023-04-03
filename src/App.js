import React from "react";
import './App.css';
import Login from "./components/login";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Home from "./components/home";
import About from "./components/about";
import Register from "./components/register";
import ForgotPassword from "./components/forgot-password";
import {GlobalProvider} from "./context/GlobalContext";

function App() {
    return (
        <GlobalProvider>
            <div className="App">
                <Router>
                    <nav>
                        <Link to="/"><span>Home</span></Link>
                        <Link to="/about"><span>About</span></Link>
                        <Link to="/login"><span>Login</span></Link>
                        <Link to="/register"><span>Register</span></Link>
                    </nav>
                    <Routes>
                        <Route path="" exact element={<Home/>}/>
                        <Route path="/login" exact element={<Login/>}/>
                        <Route path="/about" exact element={<About/>}/>
                        <Route path="/register" exact element={<Register/>}/>
                        <Route path="/forgot-password" exact element={<ForgotPassword/>}/>
                    </Routes>
                </Router>

            </div>
        </GlobalProvider>
    );
}

export default App;
