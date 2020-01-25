import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import whiteLogo from '../assets/img/turtle3.png'
import blackLogo from '../assets/img/turtle4.png'
import { getUserById } from '../actions/UserActions'
import userProfileImg from "../assets/img/user_prof_img.png";
import SearchBar from "./SearchBar";
class NavBar extends Component {
    state = {}
    // loadUser=async()=>{
    //     try {
    //         await this.props.getUserByTurlak();
    //         const user=this.props.loggedInUser;
    //         console.log('user shmuser\n',user)
    //         // document.querySelector('ul.nav-links').innerHTML+=`<li className="nav-item"><Link className="nav-link"><div className="nav-item-user-img-container"></div></Link></li>`
    //         this.setState({...this.state,user})
    //         console.log('new state',this.state)
    //     }
    //     catch{
    //         console.log('add house failed')
    //     }   
    // }
    render() {
        const { loggedInUser } = this.props;
        const consoleCaller = () => {
            const { caller } = this.props;
            console.log('this cmp was called by', caller);
        }
        const getNavClass = () => {
            if (this.props.caller !== "home") return "nav-links flex align-center black"
            else return "nav-links flex align-center"
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
                <div >
                    <div className={(loggedInUser) ? "nav-item-user-img-container visible" : "nav-item-user-img-container"}>
                        <img src={(loggedInUser) ? loggedInUser.imgUrl : userProfileImg} className="nav-item-user-img" />
                    </div>
                    {(loggedInUser) ? <span className={getuserNameClass()}>{loggedInUser.fullName}</span> : ''}
                </div>
            )
        }
        return (<div>
            {/* return <div className={`main-navbar flex space-between ${this.props.class}`}> */}

            <ul className={getNavClass()}>
                <li className={getMenuItemClass()}>            <Link to="/">
                    <img className="logo" src={(this.props.caller !== "home") ? blackLogo : whiteLogo} style={{
                        'width': '80px'
                    }} />
                </Link></li>
                <li className={getMenuItemClass()}><SearchBar></SearchBar></li>
                <li className={getMenuItemClass()}><Link to="/About" className={getLinkItemClass()}>About</Link></li>
                <li className={getMenuItemClass()}><Link to="/house/edit" className={getLinkItemClass()} >Host</Link></li>
                <li className={getMenuItemClass()}><Link className={getLinkItemClass()}  onClick={consoleCaller}>Reserved</Link></li>
                <li className={getMenuItemClass()}><Link className={getLinkItemClass()}>Favorites</Link></li>
                <li className={getMenuItemClass()}><Link to="/login" className={getLinkItemClass()}>Login/SignUp</Link></li>
                <li className={getMenuItemClass()}><Link className={getLinkItemClass()}>
                    {profileImageRender()}
                </Link>
                </li>
            </ul>

        </div>)
    }


}

// export default NavBar

const mapStateToProps = state => {
    return {
        // filterBy: state.house.filterBy,
        loggedInUser: state.user.loggedInUser,
        isLoading: state.system.isLoading
    };
};
const mapDispatchToProps = {
    // setFilter
    getUserById
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)