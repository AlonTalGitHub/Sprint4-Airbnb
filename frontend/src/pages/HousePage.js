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

    async componentWillUnmount() {
        // await this.props.filterHouses({ location: '', numOfperson: 1 })
    }    

    onDeleteHouse = (houseId) => {
        this.props.deleteHouse(houseId)
    }



    render() {
        const [house] = this.props.houses
        console.log(house)        
        return (
            <div>
                <NavBar style={{ "position": "fixed", "top": "0px", "backgroundColor": "lightblue" }}></NavBar>
                {(house) && <HouseList onDeleteHouse={this.onDeleteHouse} houses={this.props.houses}
                   filterBy={this.props.filterBy} style={{ "marginTop": "100px" }}></HouseList>}
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        houses: state.house.houses,
        filterBy: state.house.filterBy
    };
};
const mapDispatchToProps = {
    // loadHouses,
    filterHouses,
    setFilter,
    deleteHouse
};

export default connect(mapStateToProps, mapDispatchToProps)(HousePage)