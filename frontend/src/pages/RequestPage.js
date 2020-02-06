import React, { Component } from 'react';
// import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import NavBar from '../cmps/NavBar';
import RequestList from '../cmps/RequestList'
import OrderService from '../services/OrderService'
import '../assets/styles/main.css'
import HouseService from '../services/HouseService'
import Loading from '../cmps/Loading'
class RequestPage extends Component {
    state = {}
    componentDidMount() {
        console.log("did mount request page,state: ", this.state)
        this.loadHouseData()
    }
    loadHouseData = async () => {
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
        // let houses = await resHouses.map(house => {
        //     return {
        //         houseId: house._id,
        //         houseTitle: house.title,
        //         address: house.address
        //     }
        // })
        try {
            let filter = { ids: this.props.loggedInUser.houses }
            let resHouses = await HouseService.query(filter);
            console.log('resHouses: ', resHouses)
            this.setState({ houses: resHouses })
            let requestsPrms = resHouses.map(house => {
                let filterBy = {
                    houserequests: true,
                    houseId: house._id
                }
                return OrderService.getOrders(filterBy)
            })
            let requests = await Promise.all(requestsPrms)
            let newHouses = resHouses.map((house, idx) => {
                let newRequests = requests[idx].filter((request) => { if (request.status === 'initial') return request })
                house.requests = newRequests;
                return house;
            })
            this.setState({ ...this.state, ...newHouses })
        }
        catch (err) {
            console.log('err', err)
            throw err
        }
    }
    handleRequest = async (request, answer) => {
        let requestCOPY = { ...request }
        if (answer === 'accepted') requestCOPY.status = 'accepted'
        if (answer === 'rejected') requestCOPY.status = 'rejected'
        let requestUpdate = await OrderService.save(requestCOPY)
        console.log('request was updated: ', requestUpdate)

    }

    loadLists = () => {
        let lists = null
        if (this.state.houses) {
            lists = this.state.houses.filter(house => { if (house.requests && house.requests.length > 0) return house }).map((house, idx) => {

                return (
                    <div className="house-requests-list-container">
                        <div className="house-requests-house-name-container">
                            {/* <div className= "house-requests-house-name-show-requests-btn show" >^</div> */}
                            <h2 className="house-requests-house-name">{(house.title) ? house.title : 'Loading..'}</h2>
                        </div>
                        <RequestList house={house} handleRequest={this.handleRequest}
                            filterBy={''} style={{ "marginTop": "120px" }} key={idx} />
                    </div>)

            })
        }


        if (lists === null || this.props.isLoading) return (<Loading />)
        if (lists && lists.length === 0) return (<div className="empty-requests">No requests!</div>)
        return lists
    }
    render() {
        return (
            <div className="request-page-container">
                <NavBar caller={"requestpage"}></NavBar>
                <div className="request-page-sub-container">
                    <h1 className="request-page-header">My Requests</h1>
                    <div className="house-requests-container">
                        {this.loadLists()}
                    </div>
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