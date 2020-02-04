import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import OrderService from '../services/OrderService'
import '../assets/styles/main.css'
import RequestPreview from './RequestPreview'
class RequestList extends Component {
    state = {

        // isListVisible:this.props.house.isListVisible
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
            let allRequestsPrm = await OrderService.getOrders(filterBy)
            let allRequests = await Promise.all(allRequestsPrm)
            let requests = allRequests.filter((request) => { if (request.status === 'initial') return request })
            // let requests =[
            //     {
            //         _id: '5e35c8d3cdb2e21828653cc6',
            //         houseId: '5e35c84acdb2e21828653cc5',
            //         byUser: { _id: '5e32cd60a7df126288878160' },
            //         numOfPeople: 2,
            //         createdAt: 1580583122691,
            //         startDate: '2020-03-01T10:00:00.000Z',
            //         endDate: '2020-03-05T10:00:00.000Z',
            //         status: true
            //     },
            //     {
            //         _id: '5e36d678d50cd260cc7cd7cb',
            //         houseId: '5e35c84acdb2e21828653cc5',
            //         byUser: { _id: '5e2d94a5edc53b0198f86ce8' },
            //         numOfPeople: 2,
            //         createdAt: 1580652151994,
            //         startDate: '2020-05-10T09:00:00.000Z',
            //         endDate: '2020-05-14T09:00:00.000Z',
            //         status: false
            //     }
            // ]
            this.setState({ ...this.state, requests })
            // return orders
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
    //(this.state.isListVisible)? "request-container":"request-container hide"
    render() {
        { console.log('house is ', this.props.house.houseId, '\n\n', 'and the requests are: ', this.state.requests) }
        return (
            <section className={"request-container"}>
                {(!this.state.requests || (this.state.requests.length === 0)) && <div className="request-list-empty"> No new requests</div>}
                <ul className="request-list clean-list">
                    {this.state.requests && (this.state.requests.length > 0) && this.state.requests.map(request => <li key={request._id}><RequestPreview request={request} handleRequest={this.handleRequest} /></li>)}
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
