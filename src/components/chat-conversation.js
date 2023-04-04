import React, {useEffect, useState} from "react";
import "../style/chat.css"
const ChatConversation = ({socket, username, room, conversation}) => {

    const [currentMessage,setCurrentMessage] = useState("")
    const [messageList,setMessageList] = useState( conversation)
    const [currentAuthor, setCurrentAuthor] = useState("")
    console.log(room,"room")
    const sendMessage = async () =>{
        if(currentMessage!==""){
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }

            await socket.emit("send_message", messageData)
            setMessageList((list)=> [...list,messageData])
            setCurrentMessage("")
        }
    }

    useEffect(()=>{
        socket.on("receive_message",(data)=>{
            setMessageList((list)=> [...list,data])
        })

        return () => {
            socket.off("receive_message");
        };
    },[socket])

    return(
        <>
            <div className="chat_header">
                <p>{username} you are on a Live Chat</p>
            </div>
            <div className="chat_body">
                <ul className={"chat_arrange"}>
                    {messageList.map((messageContent)=>{
                        let display = ""
                        if(messageContent.author === username)
                            display = "me"
                        else
                            display = "you"
                        return(
                            <li className={"message_container"} id={display}>
                                <span className="message_content">
                                    <h4 className="author">{messageContent.author}:</h4>
                                    <p className="message">{messageContent.message}</p>
                                </span>
                                <p className="time">Time: {messageContent.time}</p>
                            </li>
                        )
                    })}
                </ul>

            </div>
            <div className="chat_footer">
                <input type="text" value={currentMessage} onChange={(e)=>setCurrentMessage(e.target.value)} placeholder="Send message..."/>
                <button onClick={()=>sendMessage()}>&#9658;</button>
            </div>
        </>
    )
}
export default ChatConversation