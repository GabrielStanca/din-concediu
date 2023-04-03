import React, {useState} from "react";
import "../style/chat.css"
import PeopleCardList from "./reusableComponents/peopleCardList";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {useGlobalContext} from "../context/GlobalContext";

const Chat= ()=> {
    const userList = [{
        firstName: "Marinica",
        lastName: "Gigel",
        email: "ionelgigel23@gmail.com",
        phone: "0753548789"
    },
        {
            firstName: "Ionel",
            lastName: "Fanel",
            email: "ionelgigel23@gmail.com",
            phone: "0753548789"
        },
        {
            firstName: "Ionel",
            lastName: "Gigel",
            email: "ionelgigel23@gmail.com",
            phone: "0753548789"
        },
        {
            firstName: "Ionel",
            lastName: "Gigel",
            email: "ionelgigel23@gmail.com",
            phone: "0753548789"
        },
        {
            firstName: "Ionel",
            lastName: "Gigel",
            email: "ionelgigel23@gmail.com",
            phone: "0753548789"
        },
        {
            firstName: "Ionel",
            lastName: "Gigel",
            email: "ionelgigel23@gmail.com",
            phone: "0753548789"
        },{
            firstName: "Ionel",
            lastName: "Gigel",
            email: "ionelgigel23@gmail.com",
            phone: "0753548789"
        },]

    const [filter, setFilter] = useState("");
    const {user} = useGlobalContext()
    console.log(user,"aaaa")
    return (
        <div className="chat_container">
            <div className="chat_list">
                <div className="searchInput">
                    <label htmlFor="email"> <FontAwesomeIcon icon={faMagnifyingGlass} /></label>
                    <input name="email" autoComplete="off"  id="email" type="email" required title placeholder="Search for a User" onChange={(e)=>{
                        setFilter( e.target.value)
                    }}/>
                </div>

                <div className="list_constainer" style={{overflowY:"auto"}}>
                    <div>
                        {userList.filter((user)=> {
                            const fullName = user.firstName +" " +user.lastName;
                            return fullName.toLowerCase().includes(filter.toLowerCase())
                        }).map((user,key)=> {
                            return(<PeopleCardList key={key} user={user}/>)
                        })}
                    </div>

                </div>

            </div>
            <div className="chat_conversation">
                <p>Actual Chat</p>
            </div>
        </div>
    );
}

export default Chat;
