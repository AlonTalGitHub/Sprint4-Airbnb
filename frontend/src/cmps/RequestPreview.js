import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../assets/styles/main.css'
//this.props.confirmGuest(ev,props.request)
export default function (props) {
    return (
        <div className="request-preview">
            <span>{props.request._id}</span>
            <button style={{'width':'100px','height':'50px'}} onClick={(ev)=>props.confirmGuest(ev,props.request)}></button>
        </div>
    )
}