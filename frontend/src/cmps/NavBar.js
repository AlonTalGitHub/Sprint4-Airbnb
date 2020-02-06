import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


import '../assets/styles/index.css'

import whiteLogo from '../assets/img/turtle3.png'
import blackLogo from '../assets/img/turtle4.png'
// import { getUserById } from '../actions/UserActions'
import userProfileImg from "../assets/img/user_prof_img.png";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";
class NavBar extends Component {
    state = {
        user: '',
        isMenuOpen: false,
        isScreen: false
    }

    componentDidMount() {
        console.log(this.props.history)
    }

    openMenu = () => {
        this.setState({ isMenuOpen: true })
    }
    toggleHamburger = () => {
        var newState = { ...this.state, isScreen: !this.state.isScreen }
        this.setState({ ...this.state, ...newState })
    }

    dispalyFilters = () => {
        const callers = ['housepage', 'housedetails']
        const display = callers.some(caller => caller === this.props.caller)
        return display
    }


    render() {
        const { loggedInUser } = this.props;
        const not_home = (this.props.caller !== "home") ? 'not-home' : ' yes-home'
        const consoleCaller = () => {
            const { caller } = this.props;
            console.log('this cmp was called by', caller);
        }
        const getNavClass = () => {
            if (this.props.caller !== "home") return "nav-links flex align-center space-between black"
            else return "nav-links flex align-center space-between"
        }
        const getMenuItemClass = () => {
            if (this.props.caller !== "home") return "nav-item black"
            else return "nav-item"
        }
        const getLinkItemClass = () => {
            if (this.props.caller !== "home") return "nav-link black"
            else return "nav-link"
        }
        const getuserNameClass = () => {
            if (this.props.caller !== "home") return "nav-item-user-name black"
            else return "nav-item-user-name"
        }
        const profileImageRender = () => {
            if (loggedInUser) {
                return (
                    <div >
                        <Link to="/">
                            <div className={(loggedInUser) ? "nav-item-user-img-container visible" : "nav-item-user-img-container"}>
                                <img src={(loggedInUser) ? loggedInUser.imgURL : userProfileImg} className="nav-item-user-img" />
                            </div>


                        </Link>

                    </div>
                )
            } else return (<div></div>)
        }
        return (<div className={"nav-container " + not_home}>
            {/* return <div className={`main-navbar flex space-between ${this.props.class}`}> */}
            {/* <Link to="/"> */}
            <div className="harta-barta">
                <img className={`logo${(this.state.isScreen) ? " show " + not_home : " hide " + not_home}`} src={(this.props.caller !== "home") ? blackLogo : whiteLogo} onClick={this.toggleHamburger} />
                <div className={getMenuItemClass() + " small-screen-hide"}>{(this.props.caller !== "home") ? <SearchBar openMenu={this.openMenu}></SearchBar> : ''}</div>
                {(this.dispalyFilters()) &&
                    <div className={`filter-buttons-container ${(this.state.isMenuOpen) ? 'shown-filter-container' : ''}`}>
                        <FilterBar></FilterBar>
                    </div>
                }

            </div>
            {/* </Link> */}

            <div className={getMenuItemClass() + " small-screen-show"}>{(this.props.caller !== "home") ? <SearchBar openMenu={this.openMenu}></SearchBar> : ''}</div>
            <div className={(this.state.isScreen) ? "nav-list-container " : "nav-list-container hide " + not_home}>

                <ul className={getNavClass() + ' ' + not_home}>
                    <Link to="/">
                        <img className={(not_home === 'not-home') ? "logo small-screen-hide" : "logo invisible small-screen-hide"} src={(this.props.caller !== "home") ? blackLogo : whiteLogo} onClick={this.toggleHamburger} />
                    </Link>
                    <li key="1" id="two" onClick={this.toggleHamburger} className={getMenuItemClass()}><Link to="/About" className={getLinkItemClass()}>About</Link></li>
                    <li key="2" id="three" onClick={this.toggleHamburger} className={getMenuItemClass() + " small-screen-show"}><Link to="/" className={getLinkItemClass()}>Home</Link></li>
                    {this.props.loggedInUser && <li id="four" key="3" onClick={this.toggleHamburger} className={getMenuItemClass()}><Link to="/house/edit" className={getLinkItemClass()} >Host</Link></li>}
                    {this.props.loggedInUser && <li id="five" key="4" onClick={this.toggleHamburger} className={getMenuItemClass()}><Link to="/reserved" className={getLinkItemClass()} onClick={consoleCaller}>Reserved</Link></li>}
                    {this.props.loggedInUser && <li id="six" key="5" onClick={this.toggleHamburger} className={getMenuItemClass()}><Link to="/favorites" className={getLinkItemClass()}>Favorites</Link></li>}
                    {this.props.loggedInUser && <li id="seven" key="6" onClick={this.toggleHamburger} className={getMenuItemClass()}><Link to="/requests" className={getLinkItemClass()}>Requests</Link></li>}
                    {this.props.loggedInUser && <li id="eight" key="7" onClick={this.toggleHamburger} className={getMenuItemClass() + " small-screen-show"}><Link to="/login" className={getLinkItemClass(this.props.loggedInUser.username)}>{`(${this.props.loggedInUser.username})`}</Link><Link to="/login">Logout</Link></li>}
                    {!this.props.loggedInUser && <li id="eight" key="7" onClick={this.toggleHamburger} className={getMenuItemClass()}><Link to="/login" className={getLinkItemClass()}>Login/Signup</Link></li>}

                    {/* { <li className={getMenuItemClass()}><Link to={"/profile/"+this.props.loggedInUser._id} className={getLinkItemClass()}>
                    {profileImageRender()}
                </Link>
                </li>} */}
                    <li className={getMenuItemClass()}>
                        {profileImageRender()}</li>
                </ul>
            </div>
        </div>)
    }


}
//<li className={getMenuItemClass()}><SearchBar></SearchBar></li>
// export default NavBar

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

export default connect(mapStateToProps, null)(NavBar)