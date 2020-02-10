import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateUser, getUserById } from '../actions/UserActions'
import UserService from '../services/UserService'
// import { AddToFavorites } from '../actions/HouseActions'
import paginationTurtle from '../assets/img/pagin_turtle.png'
let prev_next_btn_style = { 'height': '10px', 'width': '10px', 'display': 'block', 'fill': 'rgb(34, 34, 34)', 'position': 'absolute', 'left': '30%', 'top': '32%' }


class HousePreview extends Component {
    state = {
        imgIdx: 0,
        isFav: false
    }

    componentDidMount() {
        const houseId = this.props.house._id
        if (this.props.loggedInUser) {
            const isFav = this.props.loggedInUser.favorites.some(favHouseId => {
                return houseId === favHouseId
            })
            this.setState({ isFav })
        }

    }

    // componentDidUpdate(prevProps) {
    //     if (prevProps.loggedInUser !== this.props.loggedInUser) console.log('preview updated user', this.props.loggedInUser)

    // }

    loadImage = (ev, diff) => {
        ev.preventDefault();
        var imgLen = this.props.house.imgs.length;
        var currIdx = this.state.imgIdx;
        if (currIdx + diff >= imgLen) return this.setState({ imgIdx: 0 });
        else if (currIdx + diff < 0) return this.setState({ imgIdx: imgLen - 1 });
        else return this.setState({ imgIdx: currIdx + diff })
    }
    onFavClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        // this.setState({ ...this.state, isFav: !this.state.isFav })
        this.setState({ isFav: !this.state.isFav }, this.AddToFav)
    }

    AddToFav = async () => {
        const loggedInUser = { ...this.props.loggedInUser }
        console.log(loggedInUser)
        if (!loggedInUser) {
            console.log('Please login/signup')
        }
        else {    
            let favorites = loggedInUser.favorites
            if (this.state.isFav) {
                console.log('add to favs')
                favorites = [...favorites, this.props.house._id]
                loggedInUser.favorites=favorites                
                               
                // const user= await UserService.addFavorite(userToUpdate,{favId:this.props.house._id})
                            }
            else {
                console.log('remove from favs')
                favorites = favorites.filter(id => id !== this.props.house._id)
                loggedInUser.favorites = favorites
            }
            this.props.updateUser(loggedInUser)
            // this.props.AddToFavorites(loggedInUser.favorites)
        }

    }
     

    render() {
        return (
            // '+this.props.house._id
            <Link to={"/house/" + this.props.house._id}>
                <section className="house-preview-container">
                    <div className="house-preview-image-container">
                        <img className="house-preview-image" src={this.props.house.imgs[this.state.imgIdx]} alt="" />
                        <div className="house-preview-btn-container" >
                            <div className="house-preview-btn" >
                                <div className="house-preview-heart-container" onClick={this.onFavClick}>
                                    <svg className="house-preview-heart" viewBox="0 0 24 24" fill={(this.state.isFav === false) ? "white" : "red"} fillOpacity="1" stroke="#222222" strokeWidth="1.4"                                        
                                        focusable="false" aria-hidden="true" role="presentation" strokeLinecap="round"
                                        strokeLinejoin="round"><path d="m17.5 2.9c-2.1 0-4.1 1.3-5.4 2.8-1.6-1.6-3.8-3.2-6.2-2.7-1.5.2-2.9 1.2-3.6 2.6-2.3 4.1 1 8.3 3.9 11.1 1.4 1.3 2.8 2.5 4.3 3.6.4.3 1.1.9 1.6.9s1.2-.6 1.6-.9c3.2-2.3 6.6-5.1 8.2-8.8 1.5-3.4 0-8.6-4.4-8.6" strokeLinejoin="round"></path></svg>
                                </div>
                            </div>
                            <div className="house-preview-btn">
                                <div className="house-preview-btn-prev" onClick={(ev) => this.loadImage(ev, -1)}>
                                    <svg viewBox="0 0 16 16" role="presentation" aria-hidden="true" focusable="false" style={prev_next_btn_style}>
                                        <path d="m10.8 16c-.4 0-.7-.1-.9-.4l-6.8-6.7c-.5-.5-.5-1.3 0-1.8l6.8-6.7c.5-.5 1.2-.5 1.7 0s .5 1.2 0 1.7l-5.8 5.9 5.8 5.9c.5.5.5 1.2 0 1.7-.2.3-.5.4-.8.4"></path></svg>
                                </div>
                                <div className="house-preview-btn-next" onClick={(ev) => this.loadImage(ev, 1)} >
                                    <svg viewBox="0 0 16 16" role="presentation" aria-hidden="true" focusable="false" style={prev_next_btn_style}>
                                        <path d="m5.3 16c .3 0 .6-.1.8-.4l6.8-6.7c.5-.5.5-1.3 0-1.8l-6.8-6.7c-.5-.5-1.2-.5-1.7 0s-.5 1.2 0 1.7l5.8 5.9-5.8 5.9c-.5.5-.5 1.2 0 1.7.2.3.5.4.9.4"></path></svg>
                                </div>
                            </div>
                            <div className="house-preview-btn">
                                <div className="house-preview-pagination-container">
                                    {this.props.house.imgs.map((img, index) => {
                                        if (index !== this.state.imgIdx) return <div key={index} className="house-preview-pagination-circle"></div>
                                        else return <div key={index} className="house-preview-pagination-circle-currimg"><img src={paginationTurtle} alt="" className="house-preview-pagination-turtle" /></div>
                                    }
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="house-preview-details">
                        <div className="house-preview-first-line-container">
                            <span className="house-preview-first-line-superhost">SUPERHOST</span>
                            <div className="house-preview-first-line-tag">Entire guesthouse</div>
                            <div className="house-preview-first-line-rate-container">
                                <svg className="house-preview-rate-star" viewBox="0 0 1000 1000" role="presentation" aria-hidden="true" focusable="false"><path d="M972 380c9 28 2 50-20 67L725 619l87 280c11 39-18 75-54 75-12 0-23-4-33-12L499 790 273 962a58 58 0 0 1-78-12 50 50 0 0 1-8-51l86-278L46 447c-21-17-28-39-19-67 8-24 29-40 52-40h280l87-279c7-23 28-39 52-39 25 0 47 17 54 41l87 277h280c24 0 45 16 53 40z"></path></svg>
                                <span className="house-preview-first-line-rate-score" >{this.props.house.rating}</span>
                            </div>
                        </div>
                        <span className="house-preview-second-line-container">
                            {this.props.house.title}
                        </span>
                        <div className="house-preview-third-line-container">
                            <div className="house-preview-third-line-cost">
                                <span className="house-preview-third-line-cost-part-one">${this.props.house.price}</span>
                                <span className="house-preview-third-line-cost-part-two">/night</span></div>
                            {/* <div className="house-preview-third-line-total-cost"><span>₪{this.props.house.price} total</span></div> */}
                        </div>
                    </div>                    
                </section>
            </Link>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedInUser: state.user.loggedInUser
    };
};
const mapDispatchToProps = {
    updateUser,
    getUserById
    // AddToFavorites
};

export default connect(mapStateToProps, mapDispatchToProps)(HousePreview)