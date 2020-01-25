import React, { Component } from "react";
// import { withRouter } from "react-router";
import HousePreview from "./HousePreview";
import NavBar from "./NavBar";

class HouseList extends Component {
    // houses = [
    //     {
    //         "_id": "0p9o8i",
    //         "title": "House on the Lake",
    //         "description": "Central location and nice view",
    //         "owner": {
    //             "_id": "0987",
    //             "fullName": "Yael Shenker",
    //             "imgURL": "https://a0.muscache.com/im/pictures/user/e23d9c03-0de7-46f9-ba5a-c62a6358ff34.jpg?aki_policy=profile_x_medium"
    //         },
    //         "address": {
    //             "country": "Spain",
    //             "coords": {
    //                 "lat": 0,
    //                 "lng": 0
    //             }
    //         },
    //         "imgs": [
    //             "https://a0.muscache.com/im/pictures/41671788/112cfec6_original.jpg?aki_policy=xx_large",
    //             "https://a0.muscache.com/im/pictures/beb041ce-a69f-4be0-988d-1305d351e3d1.jpg?aki_policy=large",
    //             "https://a0.muscache.com/im/pictures/b87c9f56-bd6e-4cfc-b1af-5c122c5c5066.jpg?aki_policy=large",
    //             "https://a0.muscache.com/im/pictures/a52deab7-1485-4d75-b871-b468b3f4a08d.jpg?aki_policy=large",
    //             "https://a0.muscache.com/im/pictures/f3259994-cf98-4c4a-a532-c1ac95e65477.jpg?aki_policy=large"
    //         ],
    //         "capacity": 4,
    //         "price": 100,
    //         "reviews": [
    //             {
    //                 "byUser": {
    //                     "_id": "1234",
    //                     "fullName": "shay rosenthal",
    //                     "img": "http://img"
    //                 },
    //                 "txt": "Amazing place",
    //                 "rate": 4,
    //                 "createdAt": "2020-01-15T07:51:18.138Z"
    //             }
    //         ]
    //     },
    //     {
    //         "_id": "0p9o8i",
    //         "title": "House on the Lake",
    //         "description": "Central location and nice view",
    //         "owner": {
    //             "_id": "0987",
    //             "fullName": "Yael Shenker",
    //             "imgURL": "https://a0.muscache.com/im/pictures/user/e23d9c03-0de7-46f9-ba5a-c62a6358ff34.jpg?aki_policy=profile_x_medium"
    //         },
    //         "address": {
    //             "country": "Spain",
    //             "coords": {
    //                 "lat": 0,
    //                 "lng": 0
    //             }
    //         },
    //         "imgs": [
    //             "https://a0.muscache.com/im/pictures/41671788/112cfec6_original.jpg?aki_policy=xx_large",
    //             "https://a0.muscache.com/im/pictures/beb041ce-a69f-4be0-988d-1305d351e3d1.jpg?aki_policy=large",
    //             "https://a0.muscache.com/im/pictures/b87c9f56-bd6e-4cfc-b1af-5c122c5c5066.jpg?aki_policy=large",
    //             "https://a0.muscache.com/im/pictures/a52deab7-1485-4d75-b871-b468b3f4a08d.jpg?aki_policy=large",
    //             "https://a0.muscache.com/im/pictures/f3259994-cf98-4c4a-a532-c1ac95e65477.jpg?aki_policy=large"
    //         ],
    //         "capacity": 4,
    //         "price": 100,
    //         "reviews": [
    //             {
    //                 "byUser": {
    //                     "_id": "1234",
    //                     "fullName": "shay rosenthal",
    //                     "img": "http://img"
    //                 },
    //                 "txt": "Amazing place",
    //                 "rate": 4,
    //                 "createdAt": "2020-01-15T07:51:18.138Z"
    //             }
    //         ]
    //     },
    //     {
    //         "_id": "0p9o8i",
    //         "title": "House on the Lake",
    //         "description": "Central location and nice view",
    //         "owner": {
    //             "_id": "0987",
    //             "fullName": "Yael Shenker",
    //             "imgURL": "https://a0.muscache.com/im/pictures/user/e23d9c03-0de7-46f9-ba5a-c62a6358ff34.jpg?aki_policy=profile_x_medium"
    //         },
    //         "address": {
    //             "country": "Spain",
    //             "coords": {
    //                 "lat": 0,
    //                 "lng": 0
    //             }
    //         },
    //         "imgs": [
    //             "https://a0.muscache.com/im/pictures/41671788/112cfec6_original.jpg?aki_policy=xx_large",
    //             "https://a0.muscache.com/im/pictures/beb041ce-a69f-4be0-988d-1305d351e3d1.jpg?aki_policy=large",
    //             "https://a0.muscache.com/im/pictures/b87c9f56-bd6e-4cfc-b1af-5c122c5c5066.jpg?aki_policy=large",
    //             "https://a0.muscache.com/im/pictures/a52deab7-1485-4d75-b871-b468b3f4a08d.jpg?aki_policy=large",
    //             "https://a0.muscache.com/im/pictures/f3259994-cf98-4c4a-a532-c1ac95e65477.jpg?aki_policy=large"
    //         ],
    //         "capacity": 4,
    //         "price": 100,
    //         "reviews": [
    //             {
    //                 "byUser": {
    //                     "_id": "1234",
    //                     "fullName": "shay rosenthal",
    //                     "img": "http://img"
    //                 },
    //                 "txt": "Amazing place",
    //                 "rate": 4,
    //                 "createdAt": "2020-01-15T07:51:18.138Z"
    //             }
    //         ]
    //     }
    // ]

    loadHouse=()=>{


    }

    // style = { backgroundColor: 'red', position: 'fixed' }


    //////////////////////////////////////////////////////////////
    //housePreview attr: filterBy={this.props.filterBy},onDeleteHouse={this.props.onDeleteHouse} 
    //////////////////////////////////////////////////////////////



    render() {
        const {houses}=this.props
        return (
            <section className="house-container" style={this.props.style}>
                {/* <h2>{this.props.houses[0].title}</h2> */}
                {/* <NavBar style={this.style} class='banana'></NavBar> */}
                {/* <h2 className="house-main-head">Houses List</h2> */}
                <ul className="house-list clean-list">
                    {houses.map(house => (
                        <li key={house._id}>
                            <HousePreview house={house}/> 
                        </li>
                    ))}
                </ul>
            </section>
        )
    }
}

export default HouseList