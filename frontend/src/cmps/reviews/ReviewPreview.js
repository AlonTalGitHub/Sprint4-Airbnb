import React, { Component } from 'react';

export default class ReviewPreview extends Component {

    render() {
        const { review } = this.props
        return (
            <li  className= "bottom-line" key={ review.byUser._id }>
                <div>{ review.byUser.img }</div>
                <div>{ review.byUser.fullName }</div>
                <div>{ review.txt }</div>
            </li>);
    }
}