import React, { Component } from 'react';
import { deleteHouse, filterHouses } from '../actions/HouseActions'
import { connect } from 'react-redux';
// import { connect } from 'react-redux';

import HouseService from '../services/HouseService'

import NavBar from '../cmps/NavBar'
// import ChatBox from '../cmps/ChatBox'
import ReserveHouse from '../cmps/ReserveHouse.js'
import { Link } from 'react-router-dom';
import ReviewList from '../cmps/ReviewList'

import '../assets/styles/housedetails.css';


class HouseDetails extends Component {
    state = {
        house: null
    }

    componentDidMount() {
        const houseId = this.props.match.params.id;
        console.log(houseId)
        this.loadHouse(houseId)
    }

    async componentWillUnmount() {
        // await this.props.filterHouses({ location: '', numOfperson: 1 })
    }

    loadHouse = async (houseId) => {
        const house = await HouseService.get(houseId)
        this.setState({ house })

    }

    handleDelete = async () => {
        await this.props.deleteHouse(this.state.house._id)
        this.props.history.push('/')
    }

    render() {
        const { house } = this.state
        return (
            <React.Fragment>
                <NavBar style={{ "position": "fixed", "top": "0px", "backgroundColor": "lightblue" }}></NavBar>
                {(house) && <section className="housedetails-container">
                    <div className="images-container">
                        <div className="gallery">
                            <img key={1} className="img img-1" src={house.imgs[0]} alt="" />
                            <img key={2} className="img img-2" src={house.imgs[1]} alt="" />
                            <img key={3} className="img img-3" src={house.imgs[2]} alt="" />
                            <img key={4} className="img img-4" src={house.imgs[3]} alt="" />
                            <img key={5} className="img img-5" src={house.imgs[4]} alt="" />
                        </div>
                    </div>
                    <div className="main-content-container">
                        <span className="house-title span-line-break">{house.title}</span>
                        <span className="house-header span-line-break">{house.address.country}</span>
                        <span className="house-header span-line-break">Description</span>
                        <span className="house-content span-line-break">{house.description}</span>
                        <div className="details-button-container">
                            <Link to={`/house/edit/${house._id}`} >
                                <button className="form-btn pointer">Edit House</button>
                            </Link>
                            <button onClick={this.handleDelete} className="form-btn pointer">Delete House</button>
                        </div>
                        <span className="house-content span-line-break">{ house.description }</span>
                        <ReviewList reviews={ house.reviews}/>
                    </div>
                    {/* <ChatBox house={this.house}></ChatBox> */}
                    <ReserveHouse house={house} />

                </section>}
            </React.Fragment>
        )
    }
}


const mapDispatchToProps = {
    deleteHouse,
    filterHouses
};

export default connect(null, mapDispatchToProps)(HouseDetails)









// componentDidMount() {
//     this.loadHouse()
// }

// loadHouse = () => {
//     const houseId = this.props.match.params.id;
//     houseService.get(houseId).then(car=>{
//         this.setState({car});
//     })
//     console.log(houseId);
// }

