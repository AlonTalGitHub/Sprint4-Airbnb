import React, { Component } from 'react';
import { connect } from 'react-redux';
import {setFilter, filterHouses} from '../actions/HouseActions'

import SearchForm from '../cmps/SearchForm';
import backgroundImage from '../assets/img/bgc.jpg'
import HouseList from '../cmps/HouseList';
import NavBar from '../cmps/NavBar';

// import { connect } from 'react-redux';

// import { loadReviews, addReview } from '../actions/ReviewActions.js';
// import { loadUsers } from '../actions/UserActions.js';
import { Link } from 'react-router-dom';

class Home extends Component {
  state = {};

  componentDidMount() { 
    console.log('home', this.props.filterBy)
    // debugger
    this.load()
    
  }
  
  load= async()=>{
    // await this.props.setFilter({location:'',numOfperson:1})
    // debugger
    this.props.filterHouses({ location: '', numOfperson: 1, nightsNum: 1})
    
  }


  // getBestByCountry = (country) => {
  //   this.props.houses
  //   .filter(house => house.country === country)
  //   .filter(house => house.rating > 7)
  // }
  

  handleChange = ev => { };

  render() {
    return (
      <div className="home">
        <NavBar></NavBar>
        <img className="index-cover" src={backgroundImage} />
        <SearchForm></SearchForm>
       {this.props.houses.length&&<HouseList houses={this.props.houses}></HouseList>} 
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      houses: state.house.houses,
      filterBy: state.house.filterBy
  };
};
const mapDispatchToProps = {
  setFilter,
  // loadHouses,
  filterHouses
};

export default connect(mapStateToProps, mapDispatchToProps)(Home)
