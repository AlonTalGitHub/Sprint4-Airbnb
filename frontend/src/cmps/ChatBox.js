// import React, { Component } from "react";


// export default class ChatBox extends Component {
//     state = {
//         userName: 'alon',
//         msgTxt: '',
//         messages: []
//     }

//     componentDidMount() {
//         var socket = io()
//         socket.emit('join room', this.state.userName)

//         socket.on('message', (msg) => {
//             this.setState(prevState => ({ messages: [...prevState.messages, msg] }));
//         });
//     }

//     onSubmitForm = (ev) => {
//         ev.preventDefault(); // prevents page reloading
//         socket.emit('message', this.state.msgTxt);
//         this.setState({ msgTxt: '' });
//         return false;
//     }

//     handleChange = (event) => {
//         let fieldName = event.target.name,
//             value = event.target.value;
//         this.setState({ [fieldName]: value });
//     }


//     render() {
//         const { house } = this.props;
//         return (
//             <section>
//                 <ul>
//                     {this.state.messages.map((message, idx) =>
//                         <li key={idx}>
//                             <span>{message.by}: {message.txt}</span>
//                         </li>)}
//                 </ul>
//                 <form onSubmit={this.onSubmitForm} action="">
//                     <input type="text" name="msgTxt" autocomplete="off" onChange={this.handleChange} value={this.state.msgTxt} />
//                     <button>Send</button>
//                 </form>
//             </section>
//         )
//     }
// }
