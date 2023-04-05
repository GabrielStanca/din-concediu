import React from "react";
import "../../style/chat.css"
import TB from "../../images/TB_transparent.svg"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import noPhoto from "../../images/no-photo.png";
const PeopleCardList = ({user }) => {
    return (
        <div className="user-card-list_container">
            <div className="img_user_container">
                {user.imageUser ? (
                    <img
                        src={user.imageUser}
                        alt="user"
                        style={{width:"100%",height:"100%",objectFit:"contain",borderRadius:"50%"}}
                        //onClick={() => document.getElementById("fileInput").click()}
                    />
                ) : (
                    <img
                        src={noPhoto}
                        alt="user"
                        style={{width:"100%",height:"100%",objectFit:"contain",borderRadius:"50%"}}
                        //onClick={() => document.getElementById("fileInput").click()}
                        //onChange={handleImageChange}
                    />
                )}
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
