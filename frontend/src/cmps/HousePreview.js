import React from "react";

export default function HousePreview({ house }) {
    return (
        <section className="House-preview-container">
            <h2>{house.title}</h2>
            <img src={house.imgs[0]} width="100" alt=""/>
            <h3>{house.address.country}</h3>
            <h4>{house.reviews[0].rate}</h4>
        </section>
    )
}