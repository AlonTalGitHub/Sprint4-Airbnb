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


    openMenu = () => {
        this.setState({ isMenuOpen: true })
    }
    blah = () => {
        console.log('bahhhhh', this.state)
        var newState = { ...this.state, isScreen: !this.state.isScreen }
        this.setState({ ...this.state, ...newState })
    }
    kuku = () => {
        if (this.props.loggedInUser) return `logged as (${this.props.loggedInUser.username}) Signout`
        else return "Login/Signup"
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
            return (
                <div ><Link to={`/user/${this.props.loggedInUser._id}`}>
                    <div className={(loggedInUser) ? "nav-item-user-img-container visible" : "nav-item-user-img-container"}>
                        <img src={(loggedInUser) ? loggedInUser.imgURL : userProfileImg} className="nav-item-user-img" />
                    </div>
                </Link>
                    {/* {(loggedInUser) ? <span className={getuserNameClass()}>{loggedInUser.username}</span> : ''} */}
                    {(loggedInUser) ? <Link to="/login" className={getuserNameClass() + " small-screen-hide"}><span className={getuserNameClass() + " small-screen-hide"}>Logout</span></Link> : ''}
                </div>
            )
        }
        return (<div className={"nav-container " + not_home}>
            {/* return <div className={`main-navbar flex space-between ${this.props.class}`}> */}
            {/* <Link to="/"> */}
            <img className={`logo${(this.state.isScreen) ? " show " + not_home : " hide " + not_home}`} src={(this.props.caller !== "home") ? blackLogo : whiteLogo} onClick={this.blah} />
            {/* </Link> */}

            <div className={getMenuItemClass() + " small-screen-show"}>{(this.props.caller !== "home") ? <SearchBar openMenu={this.openMenu}></SearchBar> : ''}</div>
            <div className={(this.state.isScreen) ? "nav-list-container " : "nav-list-container hide " + not_home}>

                <ul className={getNavClass() + ' ' + not_home}>
                    <Link to="/">
                        <img className={(not_home === 'not-home') ? "logo small-screen-hide" : "logo invisible small-screen-hide"} src={(this.props.caller !== "home") ? blackLogo : whiteLogo} onClick={this.blah} />
                    </Link>
                    <li key="1" id="one" className={getMenuItemClass() + " small-screen-hide"}>{(this.props.caller !== "home") ? <SearchBar openMenu={this.openMenu}></SearchBar> : ''}</li>
                    <li key="2" id="two" className={getMenuItemClass()}><Link to="/About" className={getLinkItemClass()}>About</Link></li>
                    {this.props.loggedInUser && <li id="three" key="3" className={getMenuItemClass()}><Link to="/house/edit" className={getLinkItemClass()} >Host</Link></li>}
                    {this.props.loggedInUser && <li id="four" key="4" className={getMenuItemClass()}><Link to="/reserved" className={getLinkItemClass()} onClick={consoleCaller}>Reserved</Link></li>}
                    {this.props.loggedInUser && <li id="five" key="5" className={getMenuItemClass()}><Link to="/favorites" className={getLinkItemClass()}>Favorites</Link></li>}
                    {this.props.loggedInUser && <li id="six" key="6" className={getMenuItemClass()}><Link to="/requests" className={getLinkItemClass()}>Requests</Link></li>}
                    {this.props.loggedInUser && <li id="seven" key="7" className={getMenuItemClass() + " small-screen-show"}><Link to={`/user/${this.props.loggedInUser._id}`} className={getLinkItemClass(this.props.loggedInUser.username)}>{`(${this.props.loggedInUser.username})`}</Link><Link to="/login">Logout</Link></li>}
                    {!this.props.loggedInUser && <li id="seven" key="7" className={getMenuItemClass()}><Link to="/login" className={getLinkItemClass()}>Login/Signup</Link></li>}
                    {/* { <li className={getMenuItemClass()}><Link to={"/profile/"+this.props.loggedInUser._id} className={getLinkItemClass()}>
                    {profileImageRender()}
                </Link>
                </li>} */}
                    <li className={getMenuItemClass()}>
                        {profileImageRender()}</li>
                </ul>
                <div className={`filter-buttons-container ${(this.state.isMenuOpen) ? 'shown-filter-container' : ''}`}>
                    <FilterBar></FilterBar>
                </div>
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