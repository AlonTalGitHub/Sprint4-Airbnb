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
            <div>
                {/* <NavBar caller={"reservedpage"}></NavBar> */}
                <h2 className="reservedpage">My Houses</h2>
                {(houses) && <HouseList houses={this.props.houses}></HouseList>}
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