import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavBar from '../cmps/NavBar';
import Chat from '../cmps/Chat'
import '../assets/styles/chat.css'
import socketIOClient from "socket.io-client";
class ChatRoomPage extends Component {
    state = {
        messages: [],
        socket: socketIOClient(`https://turtle-house.herokuapp.com`)
    }
    componentDidMount() {
        document.querySelector('body').classList.add('chatPage')
        let { socket } = this.state
        if (socket) socket.on('serverMsg', (data) => {
            let newMessages = [...this.state.messages]
            console.log('chat here, data is: ', data)
            newMessages.push(data)
            this.setState({ messages: newMessages }, () => console.log(this.state.messages))
        });
        // console.log('before setState: ', this.state)
    }
    componentWillUnmount() {
        document.querySelector('body').classList.remove('chatPage')
    }
    render() {
        return (<div className="chat-room-page-container">
            <Chat socket={this.state.socket} messages={this.state.messages} />
        </div>
        )
    }

}


const mapStateToProps = state => {
    return {
        loggedInUser: state.user.loggedInUser
    };
};

export default connect(mapStateToProps, null)(ChatRoomPage)