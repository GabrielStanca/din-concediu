import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./components/login";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/home";
import About from "./components/about";
import Register from "./components/register";
import ForgotPassword from "./components/forgot-password";
import Profile from "./components/profile";
import { GlobalProvider, useGlobalContext } from "./context/GlobalContext";
import TB_transparent from "../src/images/TB_transparent.svg";
import Chat from "./components/chat";
import {
  faBars,
  faLock,
  faCircleDot,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getCurrentUser } from "./services/getCurrentUser";

function App() {
  const [user, setUser] = useState(null);
  const [isNavOpen, setIsNavOpen] = useState(false);

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

  const handleToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <GlobalProvider>
      <div className={`App ${isNavOpen ? "nav-open" : ""}`}>
        <Router>
          <nav className="navbar">
            <div className="navigation_logo">
              <img src={TB_transparent} alt="logo" />
            </div>
            <div
              className={`navbar__toggle ${isNavOpen ? "active" : ""}`}
              onClick={handleToggle}
            >
              <div className="navbar__toggle-icon">
                <FontAwesomeIcon icon={faBars} />
              </div>
            </div>
            <div className={`navigation_links ${isNavOpen ? "active" : ""}`}>
              <Link to="/">
                <span>Home</span>
              </Link>
              {user ? (
                <>
                  <Link to="/chat">
                    <span>Chat</span>
                  </Link>
                  <Link to="/profile">
                    <span>Profile</span>
                  </Link>
                  <Link to="/login">
                    <button
                      style={{ background: "transparent", border: 0 }}
                      onClick={handleDisconnect}
                    >
                      <FontAwesomeIcon
                      className="disconnect"
                        style={{ cursor: "pointer" }}
                        icon={faRightFromBracket}
                      />
                    </button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <span>Login</span>
                  </Link>
                  <Link to="/register">
                    <span>Register</span>
                  </Link>
                </>
              )}
            </div>
          </nav>
          <Routes>
            <Route path="" exact element={<Home />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/about" exact element={<About />} />
            <Route path="/register" exact element={<Register />} />
            <Route path="/forgot-password" exact element={<ForgotPassword />} />
            <Route path="/profile" exact element={<Profile />} />
            <Route path="/chat" exact element={<Chat />} />
          </Routes>
        </Router>
      </div>
    </GlobalProvider>
  );
}

export default App;