import React from "react";
import "../style/home.css"
import TB_transparent from "../images/TB_transparent.svg"
import Background from "../images/background.svg"

const HomePage= ()=> {
    return (
        <div className="home_container" >
            <img src={Background} className="background" alt={"background"}/>
            <h1>Welcome to Home page</h1>
            <img src={TB_transparent} alt={"asdf"}/>
        </div>
    );
}

export default HomePage;
