import React, { Component } from 'react';
// import HouseService from '../services/HouseService'
// import { Link } from 'react-router-dom'
// import { AddToFavorites } from '../actions/HouseActions'
import { loadFavorites } from '../actions/HouseActions'

import { connect } from 'react-redux';
import HouseService from '../services/HouseService'
import HouseList from '../cmps/HouseList'
import NavBar from '../cmps/NavBar';
import Loading from '../cmps/Loading'


class Favorites extends Component {

    state = {
        houses: null

    }
    componentDidMount() {
        this.loadFavoriteHouses()        

    }

    componentDidUpdate(prevProps) {
        if (prevProps.loggedInUser !== this.props.loggedInUser) {
            this.loadFavoriteHouses()
        }
    }



    loadFavoriteHouses = async () => {
        const favoriteIds = this.props.loggedInUser.favorites
        console.log('favorites page favIds are', favoriteIds)
        this.props.loadFavorites(favoriteIds)


    }

    render() {
        const { houses } = this.props        
           return (
           <div>                
                <div className="favorites-container">
                    <h2 className="favorites">My Favorite Houses</h2>
                    {(houses && !this.props.isLoading) && <HouseList houses={this.props.houses}></HouseList>}
                    {(this.props.isLoading || !houses) && <Loading />}
                </div>
            </div>)
        
    }
}


const mapStateToProps = state => {
    return {
        houses: state.house.favorites,
        loggedInUser: state.user.loggedInUser,
        isLoading: state.system.isLoading
    };
};
const mapDispatchToProps = {
    // AddToFavorites,
    loadFavorites
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites)