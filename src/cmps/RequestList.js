import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import OrderService from '../services/OrderService'
import '../assets/styles/main.css'
import RequestPreview from './RequestPreview'
class RequestList extends Component {

    handleRequest = async (request, answer) => {
        let requestCOPY = { ...request }
        if (answer === 'accepted') requestCOPY.status = 'accepted'
        if (answer === 'rejected') requestCOPY.status = 'rejected'
        let requestUpdate = await OrderService.save(requestCOPY)
        

    }
    
    render() {       
        return (
            <section className={"request-container"}>
                {(!this.props.house.requests || (this.props.house.requests.length === 0)) && <div className="request-list-empty"> No new requests</div>}
                <ul className="request-list clean-list">
                    {this.props.house.requests && (this.props.house.requests.length > 0) && this.props.house.requests.map(request => <li key={request._id}><RequestPreview request={request} handleRequest={this.props.handleRequest} /></li>)}
                </ul>
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        
        loggedInUser: state.user.loggedInUser,
        isLoading: state.system.isLoading
    };
};


export default connect(mapStateToProps, null)(RequestList)
