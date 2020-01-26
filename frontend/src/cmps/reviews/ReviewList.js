import React from 'react'
import ReviewPreview from './ReviewPreview';

export default function ReviewList(props) {

    return (
        <ul>
            {props.reviews.map(review => <ReviewPreview key={review.byUser._id} review={review} />)}
        </ul>
    )
}
