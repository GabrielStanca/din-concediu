import React, { useEffect, useState } from "react";
import "../style/home.css";
import TB_transparent from "../images/TB_transparent.svg";
import Background from "../images/background.svg";
import "../style/user-connection.css";
import { getCurrentUser } from "../services/getCurrentUser";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const userData = await getCurrentUser();
      setUser(userData);
    }
    fetchData();
  }, []);
  return (
    <div className="home_container">
      <img
        src={Background}
        className="background-image-home"
        alt={"background"}
      />
      <h1 className="home_container-title">Welcome to Team Building</h1>
      {user ? (
        <div className="home_container-text">
          <Link to="/chat">
            <span className="home_container-button">Chat</span>
          </Link>
          <p>and prepare for fun! </p>
        </div>
      ) : (
        <div className="home_container-text">
        <Link to="/login">
          <span className="home_container-button">Login Now</span>
        </Link>
        <p>to connect with your teammates</p>
        </div>
      )}
      <img src={TB_transparent} className="image-center-home" alt={"asdf"} />
    </div>
  );
};

export default HomePage;
