import React from "react";
import logo from "../logo.svg"
import "../style/home.css"
const HomePage= ()=> {
    return (
        <div className="home_container" >
            <h1>Welcome to Home page</h1>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
            </header>
        </div>
    );
}

export default HomePage;
