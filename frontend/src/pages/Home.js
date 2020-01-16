import React, { Component } from 'react';
import SearchForm from '../cmps/SearchForm';
import backgroundImage from '../assets/img/bgc.jpg'
import HouseList from '../cmps/HouseList';
import NavBar from '../cmps/NavBar';

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
        <NavBar></NavBar>
        <img className="index-cover" src={backgroundImage} />
        <SearchForm></SearchForm>
        <HouseList></HouseList>
      </div>
    );
  }
}
