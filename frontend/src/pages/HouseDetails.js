import React, { Component } from 'react';
// import { connect } from 'react-redux';

import '../assets/styles/housedetails.css'
import HouseService from '../services/HouseService'



export default class HouseDetails extends Component {
    state = {
        house: null
    }
    // house = {
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
    componentDidMount() {
        const houseId = this.props.match.params.id;
        console.log(houseId)
        this.loadHouse(houseId)
    }

    loadHouse = async (houseId) => {
        const house = await HouseService.get(houseId)
        this.setState({ house })

    }
    render() {
        const { house } = this.state        
        return (
            <section className="housedetails-container">
                <div className="images-container">
                    {(house)&&<div className="gallery">
                        <img key={0} className="img img-1" src={house.imgs[0]} alt="" />
                        <img key={1} className="img img-2" src={house.imgs[1]} alt="" />
                         <img key={2} className="img img-3" src={house.imgs[2]} alt="" />
                        <img key={3} className="img img-4" src={house.imgs[3]} alt="" />
                        <img key={4} className="img img-5" src={house.imgs[4]} alt="" />
                    </div>}
                </div>
            </section>

        )
    }
}


// const mapStateToProps = state => {
//     return {
//     };
//   };
//   const mapDispatchToProps = {
//   };

//   export default connect(mapStateToProps, mapDispatchToProps)(HouseDetails)