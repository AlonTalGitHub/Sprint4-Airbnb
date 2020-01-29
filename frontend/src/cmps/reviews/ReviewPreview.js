import React, { Component } from 'react';

import '../../assets/styles/reviewpreview.css'

export default class ReviewPreview extends Component {

    render() {
        const { review } = this.props
        return (
            <div  className="bottom-line" key={ review.byUser._id }>
                <div className="user-img-container"><img src={review.byUser.img} /></div>
                <div>{ review.byUser.fullName }</div>
                <div>{ review.txt }</div>
            </div>);
    }
}