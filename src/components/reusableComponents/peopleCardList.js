import React from "react";
import "../../style/chat.css"
import logo from "../../logo.svg";
const PeopleCardList = ({user}) => {
    return (
        <div className="user-card-list_container">
            <div className="img_user_container">
                <img className="img_user" src={logo} alt="user_image" />
            </div>
            <div className="information_user_container">
                <h1>{user.firstName}{" "}{user.lastName}</h1>
                <span>{user.email}</span>
                <span>Last update(maybe)</span>
            </div>
        </div>
    );
}

export default PeopleCardList;
