import React, { Component } from "react";
import { Link } from 'react-router-dom';

class NavBar extends Component {

    render(){
        return <div className={"main-navbar"}>
            <span>Logo</span>
            <Link>About</Link>            
            <Link>Login/SignUp</Link>
        </div>
    }


}

export default NavBar