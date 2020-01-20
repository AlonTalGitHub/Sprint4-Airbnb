import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Logo from '../assets/img/turtle3.png'

class NavBar extends Component {

    render() {
        return <div style={this.props.style} className={`main-navbar flex space-between`}>
        {/* return <div className={`main-navbar flex space-between ${this.props.class}`}> */}
            <Link to="/">
                <img className="logo" src={Logo} style={{
                    'width': '80px'
                }} />            
            </Link>
            <ul className="nav-links flex space-between align-center">
                <li><Link className="nav-link">About</Link></li>
                <li><Link className="nav-link">Login/SignUp</Link></li>
            </ul>
        </div>
    }


}

export default NavBar