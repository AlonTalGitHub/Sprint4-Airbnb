import React, { Component } from 'react';
// import HouseService from '../services/HouseService'
// import { Link } from 'react-router-dom'
import { AddToFavorites } from '../actions/HouseActions'

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
        // this.loadFavoriteHouses()
        this.props.history.push("/favorites");
        this.props.AddToFavorites(this.props.loggedInUser.favorites)

    }

    componentDidUpdate(prevProps) {
        // if(prevProps.loggedInUser!==this.props.loggedInUser){
        //     this.loadFavoriteHouses()
        // }

    }



    loadFavoriteHouses = async () => {
        const favoriteIds = this.props.loggedInUser.favorites
        if (favoriteIds.length > 0) {
            console.log('this is FavouritePage logged user is: ', this.props.loggedInUser, '\n\n', 'Favorite houses are', this.props.loggedInUser.favorites, '\n\n')
            try {
                const favHouses = await HouseService.query({ favorites: favoriteIds })

                console.log('favorite houses ', favHouses)

                this.setState({ houses: favHouses })
            }
            catch (err) {
                throw err
            }

        } else this.setState({ houses: null })
    }

    render() {
        const { houses } = this.props
        return (
            <div>
                {/* <NavBar caller={"reservedpage"}></NavBar> */}
                <div className="favorites-container">
                    <h2 className="favorites">My Favorite Houses</h2>
                    {(houses) && <HouseList houses={this.props.houses}></HouseList>}
                    {(this.props.isLoading || !houses) && <Loading />}
                </div>
            </div>
        )
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
    AddToFavorites
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites)