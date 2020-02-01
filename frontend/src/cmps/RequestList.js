import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import HousePreview from "./HousePreview";
// import NavBar from "./NavBar";
import OrderService from '../services/OrderService'
import '../assets/styles/main.css'
import RequestPreview from './RequestPreview'
import '../assets/styles/main.css'
class RequestList extends Component {
    state = {
        requests: null
    }
    componentDidMount() {
        this.pullRequests()
    }
    pullRequests = async () => {
        let house = this.props.house
        let filterBy = {
            houserequests: true,
            houseId: house.houseId
        }
        try {
            let requests = await OrderService.getOrders(filterBy)
            this.setState({ ...this.state, requests })
            // return orders
        }
        catch (err) {
            console.log('err', err)
            throw err
        }
    }
    confirmGuest = async (ev, request) => {
        let requestCOPY = { ...request }
        requestCOPY.isConfirmedByHouse = true
        let requestConfirmed = await OrderService.save(request)
        console.log('request was confirmed: ', requestConfirmed)

    }
    render() {
        { console.log('house is ', this.props.house.houseId, '\n\n', 'and the requests are: ', this.state.requests) }
        return (
            <section className="request-container">


                <ul className="request-list clean-list">
                    {this.state.requests && this.state.requests.map(request => <li key={request._id}><RequestPreview request={request} confirmGuest={this.confirmGuest} /></li>)}
                </ul>

            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        // filterBy: state.house.filterBy,
        loggedInUser: state.user.loggedInUser,
        isLoading: state.system.isLoading
    };
};
// const mapDispatchToProps = {
//     // setFilter
//     getUserById
// };

export default connect(mapStateToProps, null)(RequestList)
