import React from 'react'
import ReviewPreview from './ReviewPreview';

export default function ReviewList(props) {

    return (
        <div>
            {props.reviews.map((review, idx) => {
                if (review.byUser)
                    return <ReviewPreview key={idx} review={review} />})}
        </div>
    )
}
