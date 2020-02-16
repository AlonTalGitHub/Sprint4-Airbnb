import turtLoading from '../assets/img/loading.gif'
import React, { Component } from 'react';
export default class Loading extends Component {
    render() {
        return (
            <div className="loading-element-container"><img style={{ 'width': '100vw', 'maxWidth': '512px' }} src={turtLoading} alt="image didn't load" />
                <span className="loading-element-container-text">Loading...</span>
            </div>)
    }
}