import React, {useEffect, useState} from "react";
import "../style/chat.css"
import PeopleCardList from "./reusableComponents/peopleCardList";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {getAllUsers} from "../services/getAllUsers";
import {useGlobalContext} from "../context/GlobalContext";
import io from "socket.io-client"
import ChatConversation from "./chat-conversation";
import {createChat} from "../services/createChat";

const socket = io.connect("http://localhost:5000")


const Chat= ()=> {
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        getAllUsers().then(users => setUserList(users));
    }, []);

    const [filter, setFilter] = useState("");
    const {user} = useGlobalContext()
    let [email,domain] = ""
    if(user) {
        [email,domain] = user.email.split("@")
    }

    const [room,setRoom] = useState("")

    const joinRoom = (room) => {
        if(room !== ""){
            socket.emit("join_room",room)
        }
    }

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
                        {userList !== [] ? (userList.filter((filteredUser)=> {
                            const fullName = filteredUser.firstName +" " +filteredUser.lastName;
                            if(filteredUser.email.includes(domain) && user._id !== filteredUser._id)
                                return fullName.toLowerCase().includes(filter.toLowerCase())
                        }).map((filteredUser,key)=> {
                            return(
                                <span
                                    style={{marginBottom:"20px"}}
                                >
                                    <button onClick={()=> {

                                        const self = user._id;
                                        const target = filteredUser._id;
                                        console.log(self)
                                        console.log(target)
                                        createChat({targetId: target, initiatorId: self}).then((chat) => {
                                            setRoom(chat.roomId)
                                            console.log(chat)
                                            joinRoom(chat.roomId)
                                        })

                                    }}>Join a Room</button>
                                    <PeopleCardList key={key} user={filteredUser} />
                                </span>
                            )
                        })) : (<p>Loading...</p>)}
                    </div>

                </div>

            </div>
            <div className="chat_conversation">
                {user ? (
                    <ChatConversation socket={socket} username={user.firstName} room={room}/>
                ): (<p>Loading...</p>)}
            </div>
        </div>
    );
}

export default Chat;
