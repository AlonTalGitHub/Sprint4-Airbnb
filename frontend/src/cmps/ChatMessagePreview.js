import React from "react";
import userProfileImg from "../assets/img/user_prof_img.png";
import '../assets/styles/chat.css'
export default function ChatMessagePreview(props) {
    return (
        <div className="chat-message-preview-container">
            <div className="nav-item-user-img-container visible" >
                <img src={props.message.imgURL || userProfileImg} className="nav-item-user-img" />
            </div>
            <span className="chat-message-content">{props.message.content}</span>
        </div>
    )
}









