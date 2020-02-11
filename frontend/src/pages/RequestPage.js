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
        this.loadHouseData()
    }
    loadHouseData = async () => {
        
        try {
            let filter = { ids: this.props.loggedInUser.houses }
            let resHouses = await HouseService.query(filter);            
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

    }

    loadLists = () => {
        let lists = null
        if (this.state.houses) {
            lists = this.state.houses.filter(house => { if (house.requests && house.requests.length > 0) return house }).map((house, idx) => {

                return (
                    <div className="house-requests-list-container">
                        <div className="house-requests-house-name-container">                           
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