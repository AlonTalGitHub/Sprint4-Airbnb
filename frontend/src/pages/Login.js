import React, { Component } from 'react';
import { connect } from 'react-redux';
// import NavBar from '../cmps/NavBar';
import { Link } from 'react-router-dom';

import {
  loadUsers,
  removeUser,
  login,
  logout,
  signup
} from '../actions/UserActions';

class Login extends Component {
  state = {
    msg: '',
    loginCred: {
      email: '',
      password: ''
    },
    signupCred: {
      email: '',
      password: '',
      username: '',
      imgURL: ''
    }
  };

  loginHandleChange = ev => {
    const { name, value } = ev.target;
    this.setState(prevState => ({
      loginCred: {
        ...prevState.loginCred,
        [name]: value
      }
    }));
  };

  signupHandleChange = ev => {
    const { name, value } = ev.target;
    this.setState(prevState => ({
      signupCred: {
        ...prevState.signupCred,
        [name]: value
      }
    }));
  };

  doLogin = async ev => {
    ev.preventDefault();
    const { email, password } = this.state.loginCred;
    if (!email || !password) {
      return this.setState({ msg: 'Please enter user/password' });
    }
    const userCreds = { email, password };
    this.props.login(userCreds);
    this.setState({ loginCred: { email: '', password: '' } });
  };

  doSignup = async ev => {
    ev.preventDefault();
    const { email, password, username, imgURL } = this.state.signupCred;
    if (!email || !password || !username) {
      return this.setState({ msg: 'All inputs besides image are required!' });
    }
    const signupCreds = { email, password,"username": username, imgURL };
    this.props.signup(signupCreds);
    this.setState({ signupCred: { email: '', password: '', username: '', 'imgURL': '' } });
  };

  removeUser = userId => {
    this.props.removeUser(userId);
  };

  render() {
    let signupSection = (
      <form onSubmit={this.doSignup}>
        <input
          type="text"
          name="email"
          value={this.state.signupCred.email}
          onChange={this.signupHandleChange}
          placeholder="Email"
        />
        <br />
        <input
          name="password"
          type="password"
          value={this.state.signupCred.password}
          onChange={this.signupHandleChange}
          placeholder="Password"
        />
        <br />
        <input
          type="text"
          name="username"
          value={this.state.signupCred.username}
          onChange={this.signupHandleChange}
          placeholder="Username"
        />
        <br />
        <input
          type="text"
          name="imgURL"
          value={this.state.signupCred.imgURL}
          onChange={this.signupHandleChange}
          placeholder="image"
        />
        <br />
        <button>Signup</button>
      </form>
    );
    let loginSection = (
      <form onSubmit={this.doLogin}>
        <input
          type="text"
          name="email"
          value={this.state.loginCred.email}
          onChange={this.loginHandleChange}
          placeholder="Email"
        />
        <br />
        <input
          type="password"
          name="password"
          value={this.state.loginCred.password}
          onChange={this.loginHandleChange}
          placeholder="Password"
        />
        <br />
        <button>Login</button>
      </form>
    );
    const { loggedInUser } = this.props;
    const consoleUser = () => {
      const { loggedInUser } = this.props;
      console.log('user logged in: ', loggedInUser.fullName)
    }
    let logoutSection = (
      <div>
        {/* {this.props.isLoading && 'Loading...'} */}
        <h2 onClick={consoleUser}>Welcome:  {(loggedInUser) ? loggedInUser.username : 'blah'}</h2>
       <Link to="/"><button>Back to Turtle House</button></Link>
        <button onClick={this.props.logout}>Logout</button>
      </div>
    )
    return (
      <div>
        {!loggedInUser && loginSection}
        {!loggedInUser && signupSection}
        {(loggedInUser) ? logoutSection : ''}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    users: state.user.users,
    loggedInUser: state.user.loggedInUser,
    isLoading: state.system.isLoading
  };
};
const mapDispatchToProps = {
  login,
  logout,
  signup,
  removeUser,
  loadUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

