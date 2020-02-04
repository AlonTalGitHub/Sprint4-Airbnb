import React, { Component } from 'react';
// import { Link } from 'react-router-dom'

import { connect } from 'react-redux';

import NavBar from '../cmps/NavBar';
import RequestList from '../cmps/RequestList'
// import OrderService from '../services/OrderService'
import '../assets/styles/main.css'
import HouseService from '../services/HouseService'
class RequestPage extends Component {
    constructor(props) {
        super(props)
        if (!this.props.loggedInUser) {
            this.state = {}
        } else {

            let myHouses = this.props.loggedInUser.houses.map(myhouseId => {
                return {
                    houseId: myhouseId,
                    houseTitle: null,
                    address: null,
                    isListVisible: false
                }
            })
            this.state = { houses: myHouses }
        }
    }
    componentDidMount() {
        console.log("did mount request page")
        this.loadHouseData()
    }
    loadHouseData = async () => {
        let housePrms = this.state.houses.map(house => HouseService.get(house.houseId))
        let resHouses = await Promise.all(housePrms)
        // let resHouses=[{
        //     _id: '5e35c84acdb2e21828653cc5',
        //     address: { country: 'sweden', coords: { lat: 59.3304287, lng: 18.0666493 } },     
        //     imgs: [
        //       'http://res.cloudinary.com/dnb7d7utg/image/upload/v1580582982/pistuk_tnyjod.jpg'
        //     ],
        //     title: "kippy's house",
        //     description: 'nice and cozy',
        //     capacity: 3,
        //     price: 100,
        //     reviews: [],
        //     rating: '4.34',
        //     owner: {
        //       _id: '5e2c43ad94746e6f20ec2b6a',
        //       username: 'Kippy Ben Kippod',
        //       imgURL: 'https://besttv232-ynet-images1-prod.cdn.it.best-tv.com/PicServer4/2014/11/04/5675636/821800099791490598no.jpg'
        //     }
        //   }]
        let houses = resHouses.map(house => {
            return {
                houseId: house._id,
                houseTitle: house.title,
                address: house.address
            }
        })
        this.setState({ ...this.state, houses })
    }
    // showHideButtonClass=(house)=>{
    //     if(house.isListVisible){
    //         return "house-requests-house-name-show-requests-btn show"
    //     }else return "house-requests-house-name-show-requests-btn"
    // }


    loadLists = () => {
        let lists=(<div></div>);
        if(this.state.houses){
            {console.log('harta barta,houses: ',this.state.houses)}
        lists = this.state.houses.map((house, idx) => {

            return (
                <div className="house-requests-list-container">
                    <div className="house-requests-house-name-container">
                        {/* <div className= "house-requests-house-name-show-requests-btn show" >^</div> */}
                        <h2 className="house-requests-house-name">{(house.houseTitle) ? house.houseTitle : 'Loading..'}</h2>
                    </div>
                    <RequestList house={house}
                        filterBy={''} style={{ "marginTop": "120px" }} key={idx} />
                </div>)

        })
    }

        return lists
    }
    // toggleRequestList=(house)=>{   
    //     let houseCopy={...house}
    //     houseCopy.isListVisible=!houseCopy.isListVisible
    //     let newHouse=[...this.state.houses,{houseCopy}]
    //     this.setState({...this.state,newHouse})
    //     }
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
// const mapDispatchToProps = {
//     loadHouses,
//     filterHouses,
//     setFilter,
//     deleteHouse
// };

export default connect(mapStateToProps, null)(RequestPage)