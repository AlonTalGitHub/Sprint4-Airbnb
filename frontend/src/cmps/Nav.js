import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';
import '../assets/styles/nav.css'

import whiteLogo from '../assets/img/turtle3.png'
import blackLogo from '../assets/img/turtle4.png'
import userProfileImg from "../assets/img/user_prof_img.png";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";
import history from '../history'
class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = { width: 0, height: 0, currPath: null };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

    }
    componentDidMount() {
        this.updateWindowDimensions();
        let path = this.props.location.pathname
        this.checkIfHome(path);
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }
    toggleHamburger = () => {
        const screenWidth = this.state.width;
        if (screenWidth <= 700) {
            console.log('screenWidth: ', screenWidth)
            document.querySelector('.logo-burger').classList.toggle('open')
            document.querySelector('.nav-list-background').classList.toggle('open')
            document.querySelector('.nav-list').classList.toggle('open')
            document.querySelector('.logo').classList.toggle('open')
            let searchBar = document.querySelector('.nav-search-bar')
            if (searchBar) searchBar.classList.toggle('open')
            let searchForm = document.querySelector('.search-form');
            if (searchForm) searchForm.classList.toggle('menu-open')
        }
    }
    changeClassName = (node, str, req) => {
        var children = node.childNodes;
        for (var i = 0; i < children.length; i++) {
            this.changeClassName(children[i], str, req);
        }
        if (req === 'add') {
            if (node && node.classList) node.classList.add(str)
        }
        if (req === 'remove') {
            if (node && node.classList && node.classList.contains(str)) node.classList.remove(str)
        }
    }
    checkIfHome = (path, userClick = false) => {
        if (path === '/') {
            let navContainer = document.querySelector('.nav-container')
            this.changeClassName(navContainer, 'home', 'add')

        }
        if (path !== '/') {
            let navContainer = document.querySelector('.nav-container')
            this.changeClassName(navContainer, 'home', 'remove')
        }
        this.setState({ ...this.state, currPath: path })
        if (userClick === true && this.state.width < 700) this.toggleHamburger()
    }
    profileImageRender = () => {
        if (this.state.width > 700) {
            if (this.props.loggedInUser) {
                return (
                    <div >
                        <div className="nav-item-user-img-container visible" >
                            <img src={this.props.loggedInUser.imgURL} className="nav-item-user-img" />
                        </div>
                    </div>
                )
            } else return (<div className="nav-item-user-img-container">
                <img src={userProfileImg} className="nav-item-user-img" />
            </div>)
        } else {
            if (this.props.loggedInUser) {
                return (<div>({this.props.loggedInUser.username})Logout</div>)
            } else {
                return (<div>Login/Signup</div>)
            }
        }
    }
    render() {
        console.log('nav state is: ', this.state)
        return (<div className="nav-container">
            <div className="nav-list-background"></div>
            <ul className="nav-list">
                <li>
                    <div className="logo-container" onClick={this.toggleHamburger}>
                        <img src={whiteLogo} alt="" className="logo" />
                        <span className="logo-burger">^</span>
                    </div>
                </li>
                {(this.state.currPath !== '/') && <li className="nav-search-bar"><SearchBar /></li>}
                {(this.state.currPath !== '/') && <li onClick={() => this.checkIfHome('/', true)}><Link to="/" className="nav-link">Home</Link></li>}
                <li onClick={() => this.checkIfHome('/about', true)}><Link to="/about" className="nav-link">About</Link></li>
                {this.props.loggedInUser && <li onClick={() => this.checkIfHome('/reserved', true)}><Link to="/reserved" className="nav-link" >Reserved</Link></li>}
                {this.props.loggedInUser && <li onClick={() => this.checkIfHome('/requests', true)}><Link to="/requests" className="nav-link">Requets</Link></li>}
                {this.props.loggedInUser && <li onClick={() => this.checkIfHome('/favorites', true)}><Link to="/favorites" className="nav-link">Favorites</Link></li>}
                {this.props.loggedInUser && <li onClick={() => this.checkIfHome('/house/edit', true)}><Link to="/house/edit" className="nav-link">Host</Link></li>}
                <li onClick={() => this.checkIfHome('/login', true)}><Link to="/login" className="nav-link">{this.profileImageRender()}</Link></li>
            </ul>

        </div>)
    }

}
const mapStateToProps = state => {
    return {
        loggedInUser: state.user.loggedInUser,
        isLoading: state.system.isLoading,
        currRoute: state.system.currRoute
    };
};
const mapDispatchToProps = {

};
export default Nav = withRouter(connect(mapStateToProps, null)(Nav))