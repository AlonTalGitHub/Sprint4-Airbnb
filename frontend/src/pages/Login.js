import React, { Component } from 'react';
import { connect } from 'react-redux';
// import NavBar from '../cmps/NavBar';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import {updateRoute} from '../actions/SystemActions'
import '../assets/styles/index.css'

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
    await this.props.login(userCreds);
    this.setState({ loginCred: { email: '', password: '' } });
    this.props.updateRoute('/')
    this.props.history.push('/')
  };

  doSignup = async ev => {
    ev.preventDefault();
    const { email, password, username, imgURL } = this.state.signupCred;
    if (!email || !password || !username) {
      return this.setState({ msg: 'All inputs besides image are required!' });
    }
    const signupCreds = { email, password, "username": username, imgURL };
    this.props.signup(signupCreds);
    this.setState({ signupCred: { email: '', password: '', username: '', 'imgURL': '' } });
    this.props.updateRoute('/')
    this.props.history.push('/')
  };

  removeUser = userId => {
    this.props.removeUser(userId);
  };

  render() {
    let signupSection = (
      <form className="login-form sign-up flex column space-between" onSubmit={this.doSignup}>
        <input
          className="form-loc"
          type="text"
          name="email"
          value={this.state.signupCred.email}
          onChange={this.signupHandleChange}
          placeholder="Email"
        />
        <input
          className="form-loc"
          name="password"
          type="password"
          value={this.state.signupCred.password}
          onChange={this.signupHandleChange}
          placeholder="Password"
        />
        <input
          className="form-loc"
          type="text"
          name="username"
          value={this.state.signupCred.username}
          onChange={this.signupHandleChange}
          placeholder="Username"
        />
        <input
          className="form-loc"
          type="text"
          name="imgURL"
          value={this.state.signupCred.imgURL}
          onChange={this.signupHandleChange}
          placeholder="image"
        />
        <button className="form-btn login-btn">Signup</button>
      </form>
    );
    let loginSection = (
      <form className="login-form flex column space-between" onSubmit={this.doLogin}>
        <div>
          <input
            className="form-loc"
            type="text"
            name="email"
            value={this.state.loginCred.email}
            onChange={this.loginHandleChange}
            placeholder="Email"
          />
          <input
            className="form-loc"
            type="password"
            name="password"
            value={this.state.loginCred.password}
            onChange={this.loginHandleChange}
            placeholder="Password"
          />
        </div>
        <button className="form-btn login-btn">Login</button>
      </form>
    );
    const { loggedInUser } = this.props;
    const consoleUser = () => {
      const { loggedInUser } = this.props;      
    }
    let logoutSection = (
      <div className="login-form flex column space-between">        
        <h2 onClick={consoleUser}>Welcome:  {(loggedInUser) ? loggedInUser.username : 'blah'}</h2>
        <Link to="/"><button className="form-btn login-btn">Back to Turtle House</button></Link>
        <button className="form-btn login-btn" onClick={this.props.logout}>Logout</button>
      </div>
    )
    return (
      <div className="flex column space-between">
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
  loadUsers,
  updateRoute

};

export default Login = withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));

