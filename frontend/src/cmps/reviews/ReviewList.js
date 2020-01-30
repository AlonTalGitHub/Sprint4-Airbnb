import React from 'react'
import ReviewPreview from './ReviewPreview';

export default function ReviewList(props) {

    return (
        <div>
            {props.reviews.map((review, idx) => <ReviewPreview key={idx} review={review} />)}
        </div>
    )
}
