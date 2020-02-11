import React, { Component } from 'react';
// import HouseService from '../services/HouseService'
// import { Link } from 'react-router-dom'

import { connect } from 'react-redux';
import { setFilter, filterHouses, deleteHouse } from '../actions/HouseActions'
import HouseList from '../cmps/HouseList'
import NavBar from '../cmps/NavBar';
import Loading from '../cmps/Loading'
class HousePage extends Component {


    componentDidMount() {      
        
        this.props.filterHouses(this.props.filterBy)

    }


    onDeleteHouse = (houseId) => {
        this.props.deleteHouse(houseId)
    }


    render() {
        const [house] = this.props.houses        
        if (this.props.isLoading || !house) return (
            <div>                
                <Loading />
            </div>
        )
        else {
            return (
                <div className="house-page-container">                    
                    <span className="house-page-header">Houses</span>
                    {(house) && <HouseList onDeleteHouse={this.onDeleteHouse} houses={this.props.houses}
                        filterBy={this.props.filterBy} style={{ "marginTop": "150px" }}></HouseList>}
                </div>
            )
        }
    }
}


const mapStateToProps = state => {
    return {
        houses: state.house.houses,
        filterBy: state.house.filterBy,
        isLoading: state.system.isLoading
    };
};
const mapDispatchToProps = {
    // loadHouses,
    filterHouses,
    setFilter,
    deleteHouse
};

export default connect(mapStateToProps, mapDispatchToProps)(HousePage)