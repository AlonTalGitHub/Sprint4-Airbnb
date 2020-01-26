import React, { Component } from 'react';
// import HouseService from '../services/HouseService'
// import { Link } from 'react-router-dom'

import { connect } from 'react-redux';
import HouseService from '../services/HouseService'
import HouseList from '../cmps/HouseList'
import NavBar from '../cmps/NavBar';


class ResrvedPage extends Component {
    state = {}
    componentDidMount() {
        const orders = this.props.loggedInUser.reserved
        console.log('this is ReservedPage speaking logged user is: ',this.props.loggedInUser,'\n\n','the reserved houses arr',this.props.loggedInUser.reserved,'\n\n')
        const isReserved=true;
        const houses = orders.map(async order => {
            try {
                await HouseService.query({ "_id": order.houseId,isReserved})
            }
            catch (err) {
                throw err
            }
        })
        this.setState({...this.state,houses})
    }

    render() {

        return (
            <div>
                <NavBar caller={"reservedpage"}></NavBar>
                <HouseList houses={this.state.houses}></HouseList>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        // houses: state.house.houses,
        // filterBy: state.house.filterBy
        loggedInUser: state.user.loggedInUser
    };
};
// const mapDispatchToProps = {
//     // loadHouses,
//     filterHouses,
//     setFilter,
//     deleteHouse
// };

export default connect(mapStateToProps, null)(ResrvedPage)