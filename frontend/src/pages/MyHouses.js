import React, { Component } from 'react';
import { setMyHouses } from '../actions/HouseActions'
import { connect } from 'react-redux';
import HouseService from '../services/HouseService'
import HouseList from '../cmps/HouseList'
import NavBar from '../cmps/NavBar';



class Favorites extends Component {

    
    componentDidMount() { 
        this.props.history.push("/myhouses");       
        this.props.setMyHouses(this.props.loggedInUser.houses)
    }
    

    render() {
        const { houses } = this.props

        return (
            <div className="my-houses-page-container">
                {/* <NavBar caller={"reservedpage"}></NavBar> */}
                <span className="my-houses-header">My Houses</span>
                {(houses) && <HouseList houses={this.props.houses} caller={"myHouses"}></HouseList>}
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        houses: state.house.myHouses,
        loggedInUser: state.user.loggedInUser
    };
};
const mapDispatchToProps = {
    setMyHouses
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites)