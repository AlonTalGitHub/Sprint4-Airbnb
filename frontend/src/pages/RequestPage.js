import React, { Component } from 'react';
// import HouseService from '../services/HouseService'
// import { Link } from 'react-router-dom'

import { connect } from 'react-redux';

import NavBar from '../cmps/NavBar';
import RequestList from '../cmps/RequestList'
import OrderService from '../services/OrderService'
import '../assets/styles/main.css'
import HouseService from '../services/HouseService'
class RequestPage extends Component {
    constructor(props) {
        super(props)
        let myHouses = this.props.loggedInUser.houses.map(myhouseId => {
            return {
                houseId: myhouseId,
                houseTitle: null,
                address: null,
            }
        })
        this.state = { houses: myHouses }
    }
    componentDidMount() {
        console.log("did mount request page")
        this.loadHouseData()
    }
    loadHouseData = async () => {
        let housePrms = this.state.houses.map(house => HouseService.get(house.houseId))
        let resHouses = await Promise.all(housePrms)
        let houses = resHouses.map(house => {
            return {
                houseId: house.houseId,
                houseTitle: house.title,
                address: house.address
            }
        })
        this.setState({ ...this.state, houses })

    }
    loadLists = () => {
        let lists = this.state.houses.map((house, idx) => {

            return (
                <div className="house-requests-list-container">
                    <h2>{house.houseTitle}</h2>
                    <RequestList house={house}
                        filterBy={''} style={{ "marginTop": "120px" }} key={idx} />
                </div>)

        })
        return lists
    }

    render() {
        return (
            <div className="request-page-container">
                <NavBar caller={"requestpage"}></NavBar>
                <h1 className="request-page-header">My Requests</h1>
                <div className="house-requests-container">
                    {this.loadLists()}
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        houses: state.house.houses,
        filterBy: state.house.filterBy,
        isLoading: state.system.isLoading,
        loggedInUser: state.user.loggedInUser,
    };
};
const mapDispatchToProps = {
    // loadHouses,
    // filterHouses,
    // setFilter,
    // deleteHouse
};

export default connect(mapStateToProps, null)(RequestPage)