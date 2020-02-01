import React, { Component } from 'react';
import { deleteHouse, filterHouses } from '../actions/HouseActions'
import { connect } from 'react-redux';
// import { connect } from 'react-redux';

import HouseService from '../services/HouseService'

import NavBar from '../cmps/NavBar'
import DatePicker from '../cmps/DatePicker'
// import ChatBox from '../cmps/ChatBox'
import ReserveHouse from '../cmps/ReserveHouse.js'
import { Link } from 'react-router-dom';
import ReviewList from '../cmps/reviews/ReviewList';

import '../assets/styles/housedetails.css';
import '../assets/styles/index.css';
import '../assets/styles/reviewpreview.css';
import ReviewCompose from '../cmps/reviews/ReviewCompose';
import MapPreview from '../cmps/MapPreview.js'


class HouseDetails extends Component {
    state = {
        house: null
    }

    componentDidMount() {
        const houseId = this.props.match.params.id;
        console.log('details mounting: ',houseId)
        this.loadHouse(houseId)
    }

    async componentWillUnmount() {
        // await this.props.filterHouses({ location: '', numOfperson: 1 })
    }

    loadHouse = async (houseId) => {
        const house = await HouseService.get(houseId)
        console.log('house details page',house)
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
                <NavBar caller={"housedetails"}></NavBar>
                {(house) && <section className="housedetails-container">
                    <div className="images-container">
                        <div className="gallery">
                            {house.imgs.map((img, idx) => <img key={idx} className={`img img-${idx}`} src={img} alt="" />)}
                        </div>
                    </div>
                    <div className="main-content-container flex">
                        <div className="main-content-text-container">
                            <span className="house-title span-line-break">{house.title}</span>
                            <span className="house-header span-line-break">{house.address.country}</span>
                            <span className="house-header span-line-break">Description</span>
                            <p className="house-content span-line-break bottom-line">{house.description}</p>
                            <ReviewList reviews={ house.reviews}/>
                            <ReviewCompose house={house}/>
                            <div className="details-button-container flex space-between">
                                <Link to={`/house/edit/${house._id}`} >
                                    <button className="form-btn pointer">Edit House</button>
                                </Link>
                                <button onClick={this.handleDelete} className="form-btn pointer">Delete House</button>
                            </div>
                        </div>
                        <ReserveHouse house={house} detailsPage={true} />
                        
                    </div>
                    {/* <ChatBox house={this.house}></ChatBox> */}
                    <MapPreview caller="housedetails" house={house}/>
                </section>}
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        houses: state.house.houses
    };
};
const mapDispatchToProps = {
    deleteHouse,
    filterHouses
};

export default connect(mapStateToProps, mapDispatchToProps)(HouseDetails)

