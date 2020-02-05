import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setFilter, filterHouses, getBestByCountry } from '../actions/HouseActions'

import SearchForm from '../cmps/SearchForm';
import backgroundImage from '../assets/img/bgc.jpg'
import HouseList from '../cmps/HouseList';
import NavBar from '../cmps/NavBar';
// import MapMarker from '../cmps/MapMarker'
// import { connect } from 'react-redux';

// import { loadReviews, addReview } from '../actions/ReviewActions.js';
// import { loadUsers } from '../actions/UserActions.js';
import { Link } from 'react-router-dom';

class Home extends Component {
  state = {};

  componentDidMount() {
    console.log('home', this.props.filterBy)
    console.log('welcome back to turtle house user : ', this.props.loggedInUser)
    // debugger
    this.load()

  }

  load = async () => {
    // this.props.filterHouses({ location: '', numOfperson: 1, nightsNum: 1 })
    this.props.getBestByCountry({ countries: ['israel'] })
    this.props.getBestByCountry({ countries: ['spain'] })
    this.props.getBestByCountry({ countries: ['italy'] })

  }


  getBestByCountry = (country) => {
    return this.props.houses.filter(house => house.address.country === country)

  }

  render() {
    return (
      <div className="home">
        <NavBar caller={"home"}></NavBar>
        <img className="index-cover" src={backgroundImage} />
        <SearchForm></SearchForm>
        {/* {this.props.houses.length&& */}
        <section className="lists-section-container">
          <div>
            <h4 className="reccomended-headline">Most reccomended in Israel</h4>
            <HouseList houses={this.props.israel}></HouseList>
          </div>
          <div>
            <h4 className="reccomended-headline">Most reccomended in Italy</h4>
            <HouseList houses={this.props.italy}></HouseList>
          </div>
          <div>
            <h4 className="reccomended-headline">Most reccomended in Spain</h4>
            <HouseList houses={this.props.spain}></HouseList>
          </div>
        </section>
        {/* /* <MapMarker/> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    houses: state.house.houses,
    israel: state.house.israel,
    italy: state.house.italy,
    spain: state.house.spain,
    filterBy: state.house.filterBy,
    loggedInUser: state.user.loggedInUser,
    isLoading: state.system.isLoading
  };
};
const mapDispatchToProps = {
  setFilter,
  getBestByCountry,
  // loadHouses,
  filterHouses
};
export default connect(mapStateToProps, mapDispatchToProps)(Home)
