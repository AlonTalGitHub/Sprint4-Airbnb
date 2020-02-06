import React, { Component } from 'react';
// import HouseService from '../services/HouseService'
// import { Link } from 'react-router-dom'

import { connect } from 'react-redux';
import { setFilter, filterHouses, deleteHouse } from '../actions/HouseActions'
import HouseList from '../cmps/HouseList'
import NavBar from '../cmps/NavBar';
import MapPreview from '../cmps/MapPreview'

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
        let kippy = {
            _id: '5e35c84acdb2e21828653cc5',
            address: { country: 'sweden', coords: { lat: 59.3304287, lng: 18.0666493 } },
            imgs: [
                'http://res.cloudinary.com/dnb7d7utg/image/upload/v1580582982/pistuk_tnyjod.jpg'
            ],
            title: "kippy's house",
            description: 'nice and cozy',
            capacity: 3,
            price: 100,
            reviews: [],
            rating: '4.34',
            owner: {
                _id: '5e2c43ad94746e6f20ec2b6a',
                username: 'Kippy Ben Kippod',
                imgURL: 'https://besttv232-ynet-images1-prod.cdn.it.best-tv.com/PicServer4/2014/11/04/5675636/821800099791490598no.jpg'
            }
        }
        return (
            <div>
                <NavBar caller={"housepage"}></NavBar>
                {(house) && <HouseList onDeleteHouse={this.onDeleteHouse} houses={this.props.houses}
                    filterBy={this.props.filterBy} style={{ "marginTop": "150px" }}></HouseList>}
                <MapPreview house={kippy} />
            </div>
        )
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