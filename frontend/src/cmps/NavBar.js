import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Logo from '../assets/img/turtle3.png'
import { getUserById} from '../actions/UserActions'
import userProfileImg from "../assets/img/user_prof_img.png";
class NavBar extends Component {
    state={
        user:''
    }
loadUser=async()=>{
    try {
        await this.props.getUserById('1234');
        const user=this.props.loggedInUser;
        console.log('user shmuser\n',user)
        // document.querySelector('ul.nav-links').innerHTML+=`<li className="nav-item"><Link className="nav-link"><div className="nav-item-user-img-container"></div></Link></li>`
        this.setState({...this.state,user})
        console.log('new state',this.state)
    }
    catch{
        console.log('add house failed')
    }   
}
    render() {
        return <div style={this.props.style} className={`main-navbar flex space-between`}>
            {/* return <div className={`main-navbar flex space-between ${this.props.class}`}> */}
            <Link to="/">
                <img className="logo" src={Logo} style={{
                    'width': '80px'
                }} />
            </Link>
            <ul className="nav-links flex space-between align-center">
                <li className="nav-item"><Link className="nav-link">About</Link></li>
                <li className="nav-item"><Link to="/house/edit" className="nav-link" >Host</Link></li>
                <li className="nav-item"><Link className="nav-link">Reserved</Link></li>
                <li className="nav-item"><Link className="nav-link">Favorites</Link></li>
                <li className="nav-item"><Link className="nav-link" onClick={this.loadUser}>Login/SignUp</Link></li>
                <li className="nav-item"><Link className="nav-link">
                    <div className={this.state.user? "nav-item-user-img-container visible" :"nav-item-user-img-container"}>
                        <img src= {userProfileImg} className="nav-item-user-img"/>
                        </div> 
                    <span className="nav-item-user-name">{this.state.user? this.state.user.fullName:''}</span>
                    </Link>
                    </li>
            </ul>

        </div>
    }


}

// export default NavBar

const mapStateToProps = state => {
    return {
        // filterBy: state.house.filterBy,
        loggedInUser:state.user.loggedInUser
    };
};
const mapDispatchToProps = {
    // setFilter
    getUserById
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)