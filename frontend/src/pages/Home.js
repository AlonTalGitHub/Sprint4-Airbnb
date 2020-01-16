import React, { Component } from 'react';
import SearchForm from '../cmps/SearchForm';
import backgroundImage from '../assets/img/bgc.jpg'
import Logo from '../assets/img/turtle3.png'
// import { connect } from 'react-redux';

// import { loadReviews, addReview } from '../actions/ReviewActions.js';
// import { loadUsers } from '../actions/UserActions.js';
// import { Link } from 'react-router-dom';

export default class Home extends Component {
  state = {};

  componentDidMount() { }

  handleChange = ev => { };

  render() {
    return (
      <div className="home">
        <img className="index-cover" src={backgroundImage} />
        <img className="logo" src={Logo} style={{
          'position': 'absolute',
          'width': '80px',
          'top': '10px',
          'left': '10px',
        }} />
        <h1>Welcome Home</h1>
        <SearchForm></SearchForm>
      </div>
    );
  }
}
