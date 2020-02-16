import React, { Component } from "react";
import { connect } from 'react-redux';
import ChatMessagePreview from '../cmps/ChatMessagePreview'
import '../assets/styles/chat.css'
import socketIOClient from "socket.io-client";
import OverflowScrolling from 'react-overflow-scrolling';
class Chat extends Component {
    state = {
        currMessage: {
            username: this.props.loggedInUser.username || null,
            imgURL: this.props.loggedInUser.imgURL || null,
            content: ''
        },
    }
    handleMessage = ev => {
        const { name, value } = ev.target;
        this.setState(prevState => ({
            currMessage: {
                ...prevState.currMessage,
                [name]: value
            }
        }));
    };
    postMessage = (ev) => {
        if (!this.state.currMessage.content) return;
        this.props.socket.emit('userMsg', this.state.currMessage);
    }

     messagesList=()=> {
        if (!this.props.messages) return (<div></div>)
        else {
            return (
                <ul className="chat-messages-list">
                    {this.props.messages.map((message, idx) => <li key={idx} className="message-preview-item"><ChatMessagePreview message={message} /></li>)}
                </ul>
            )
        }

    }
    render() {
        return (
            <div className="chat-container">
                <div className="chat-messages-container">
                    {this.messagesList()}
                </div>
                <div className="chat-input-container">
                    <input type="text" name="content" value={this.state.currMessage.content} onChange={this.handleMessage} />
                    <button onClick={this.postMessage}>Send</button>
                </div>

            </div>
        )
    }








}
const mapStateToProps = state => {
    return {
        loggedInUser: state.user.loggedInUser,
        isLoading: state.system.isLoading,
        currRoute: state.system.currRoute
    };
};
export default connect(mapStateToProps, null)(Chat)