import React, { Component } from 'react';
// import HouseService from '../services/HouseService'
// import { Link } from 'react-router-dom'

import { connect } from 'react-redux';
import { setFilter, filterHouses, deleteHouse } from '../actions/HouseActions'
import HouseList from '../cmps/HouseList'
import NavBar from '../cmps/NavBar';


class HousePage extends Component {
    componentDidMount() {
        console.log("did mount house page")
        this.props.filterHouses(this.props.filterBy)

    }
      

    onDeleteHouse = (houseId) => {
        this.props.deleteHouse(houseId)
    }

//#484848
//style={{ "position": "fixed", "top": "0px", "backgroundColor": "white","color":"rgb(34, 34, 34)" }}

    render() {
        const [house] = this.props.houses
        console.log(house)   
             //"backgroundColor": "lightbue"
        return (
            <div>
                <NavBar caller={"housepage"}></NavBar>
                {(house) && <HouseList onDeleteHouse={this.onDeleteHouse} houses={this.props.houses}
                   filterBy={this.props.filterBy} style={{ "marginTop": "150px" }}></HouseList>}
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        houses: state.house.houses,
        filterBy: state.house.filterBy,
        isLoading:state.system.isLoading
    };
};
const mapDispatchToProps = {
    // loadHouses,
    filterHouses,
    setFilter,
    deleteHouse
};

export default connect(mapStateToProps, mapDispatchToProps)(HousePage)