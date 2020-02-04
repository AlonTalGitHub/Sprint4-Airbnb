import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../assets/styles/main.css'
import { loadUsers } from "../actions/UserActions";
import UserService from '../services/UserService'
import moment from 'moment'
// export default function RequestPreview(props){
//this.props.confirmGuest(ev,props.request)
export default class RequestPreview extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentDidMount() {
        this.loadUser(this.props.request.byUser._id);

    }
    loadUser = async (userId) => {
        let requestingUser = await UserService.getById(userId)
        console.log(' requestingUser: ', requestingUser)
        this.setState({ user: requestingUser })
    }
    render() {
        if (this.state.user) {
            return (
                <div className="request-preview">
                    {/* <span>{props.request._id}</span> */}
                    {/* <button style={{'width':'100px','height':'50px'}} onClick={(ev)=>props.confirmGuest(ev,props.request)}></button> */}

                    <div className="nav-item-user-img-container visible requests">
                        <img src={this.state.user.imgURL} className="nav-item-user-img" />
                    </div>
                    <div className="request-preview-details user-details">
                        <span className="request-preview-details-header">User Details</span>
                        <span className="request-preview-details-detail">{this.state.user.username}</span>
                        <span className="request-preview-details-detail">{this.state.user.email}</span>
                    </div>
                    <div className="request-preview-details">
                        <span className="request-preview-details-header">Request Details</span>
                        <span className="request-preview-details-detail">{moment(this.props.request.startDate).format("MMM Do YY")}</span>
                        <span className="request-preview-details-detail">{moment(this.props.request.endDate).format("MMM Do YY")}</span>
                        <span className="request-preview-details-detail">{(this.props.request.numOfPeople > 1) ? this.props.request.numOfPeople + ' people' : this.props.request.numOfPeople + ' person'}</span>
                        <div className="request-preview-btns small-screen">
                            <div className="request-preview-btn yes" onClick={() => this.props.handleRequest(this.props.request, 'accepted')}>YES</div>
                            <div className="request-preview-btn no" onClick={() => this.props.handleRequest(this.props.request, 'rejected')}>NO</div>
                        </div>
                    </div>
                    <div className="request-preview-btns big-screen">
                        <div className="request-preview-btn yes big-screen" onClick={() => this.props.handleRequest(this.props.request, 'accepted')}>YES</div>
                        <div className="request-preview-btn no big-screen" onClick={() => this.props.handleRequest(this.props.request, 'rejected')}>NO</div>
                    </div>
                </div>
            )
        }
        else return (<div></div>)

    }
}