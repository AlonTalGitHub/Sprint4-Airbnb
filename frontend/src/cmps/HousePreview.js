import React from "react";
import { Link } from 'react-router-dom';


export default function HousePreview({ house }) {
    return (
        <Link to={`/house/${house._id}`}>
            <section className="house-preview-container">
                <div className="house-preview-image-container">
                    <img className="house-preview-image" src={house.imgs[0]} alt="" />
                    {/* <div className="house-preview-add-to-favs-btn">
                    <svg viewBox="0 0 24 24" fill="red" fill-opacity="1" stroke="#222222" stroke-width="1.4"
                        focusable="false" aria-hidden="true" role="presentation" stroke-linecap="round"
                        stroke-linejoin="round"><path d="m17.5 2.9c-2.1 0-4.1 1.3-5.4 2.8-1.6-1.6-3.8-3.2-6.2-2.7-1.5.2-2.9 1.2-3.6 2.6-2.3 4.1 1 8.3 3.9 11.1 1.4 1.3 2.8 2.5 4.3 3.6.4.3 1.1.9 1.6.9s1.2-.6 1.6-.9c3.2-2.3 6.6-5.1 8.2-8.8 1.5-3.4 0-8.6-4.4-8.6" stroke-linejoin="round"></path></svg>
                </div> */}
                </div>
                <div className="house-preview-details">
                    <div className="house-preview-first-line-container">
                        <span className="house-preview-first-line-superhost">SUPERHOST</span>
                        <div className="house-preview-first-line-tag">Entire guesthouse</div>
                        <div className="house-preview-first-line-rate-container">
                            <svg className="house-preview-rate-star" viewBox="0 0 1000 1000" role="presentation" aria-hidden="true" focusable="false"><path d="M972 380c9 28 2 50-20 67L725 619l87 280c11 39-18 75-54 75-12 0-23-4-33-12L499 790 273 962a58 58 0 0 1-78-12 50 50 0 0 1-8-51l86-278L46 447c-21-17-28-39-19-67 8-24 29-40 52-40h280l87-279c7-23 28-39 52-39 25 0 47 17 54 41l87 277h280c24 0 45 16 53 40z"></path></svg>
                            <span className="house-preview-first-line-rate-score" >4.92</span>
                        </div>
                    </div>
                    <span className="house-preview-second-line-container">
                        Wandering Trout Crafty Ales
                </span>
                    <div className="house-preview-third-line-container">
                        <div className="house-preview-third-line-cost">
                            <span className="house-preview-third-line-cost-part-one">₪406</span>
                            <span className="house-preview-third-line-cost-part-two">/night</span></div>
                        <div className="house-preview-third-line-total-cost"><span>₪1,376 total</span></div>
                    </div>
                </div>
            </section>
        </Link>
    )
}