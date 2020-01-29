import React, { Component } from 'react';
import HouseList from '../cmps/HouseList';
import { connect } from 'react-redux';


class UserProfile extends Component {

    render(){
        const {favorites}=this.props.loggedInUser
        console.log(favorites)
        return <HouseList houses={favorites}></HouseList>
    }
}

const mapStateToProps = state => {
    return {
        // filterBy: state.house.filterBy,
        loggedInUser: state.user.loggedInUser,
        isLoading: state.system.isLoading
    };
};
// const mapDispatchToProps = {
//     // setFilter
//     getUserById
// };

export default connect(mapStateToProps, null)(UserProfile)