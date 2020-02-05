import React, { Component } from 'react';
import HouseList from '../cmps/HouseList';
import { connect } from 'react-redux';


class UserProfile extends Component {

    render() {
        return (<div>
           <span>welcome user!</span>
        </div>)
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