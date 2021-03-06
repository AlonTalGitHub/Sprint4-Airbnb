import React, { Component } from 'react';
import { setMyHouses } from '../actions/HouseActions'
import { connect } from 'react-redux';
import HouseService from '../services/HouseService'
import HouseList from '../cmps/HouseList'
import NavBar from '../cmps/NavBar';
import Loading from '../cmps/Loading'

import '../assets/styles/main.css'
class Favorites extends Component {


    componentDidMount() {
        this.props.setMyHouses(this.props.loggedInUser.houses)
    }


    render() {
        const { houses } = this.props

        return (
            <div className="my-houses-page-container">
                {/* <NavBar caller={"reservedpage"}></NavBar> */}
                <span className="my-houses-header">My Houses</span>
                {(houses && !this.props.isLoading) && <HouseList houses={this.props.houses}></HouseList>}
                {(this.props.isLoading || !houses) && <Loading />}
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        houses: state.house.myHouses,
        loggedInUser: state.user.loggedInUser,
        isLoading: state.system.isLoading
    };
};
const mapDispatchToProps = {
    setMyHouses
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites)