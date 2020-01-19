import React, { Component } from 'react';
// import HouseService from '../services/HouseService'
// import { Link } from 'react-router-dom'

import { connect } from 'react-redux';
import { loadHouses, setFilter, filterHouses } from '../actions/HouseActions'
import HouseList from '../cmps/HouseList'
import NavBar from '../cmps/NavBar';


class HousePage extends Component {

    componentDidMount() {
        console.log("did mount house page")
        this.props.loadHouses(this.props.filterBy)

    }

   async componentWillUnmount() {
        await this.props.filterHouses({location:'',numOfperson:1})       

    }

    load = async () => {
        // await this.props.loadHouses()
        // console.log(this.props.houses[0].title)
        console.log(this.props.filterBy)
    }



    render() {
        const [house] = this.props.houses
        return (
            <div>
                <NavBar style={{ "position": "fixed", "top": "0px", "backgroundColor": "lightblue" }}></NavBar>
                {(house) && <HouseList houses={this.props.houses}
                 style={{ "marginTop": "100px" }}></HouseList>}
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        houses: state.house.houses,
        filterBy: state.house.filterBy
    };
};
const mapDispatchToProps = {
    loadHouses,
    filterHouses,
    setFilter
};

export default connect(mapStateToProps, mapDispatchToProps)(HousePage)