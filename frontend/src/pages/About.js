import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavBar from '../cmps/NavBar';
import cabin from '../assets/img/crap1.jpg'
class About extends Component {
    state={
        user:''
    }
render(){

    return(<div>
        <img src={cabin} alt="" className="src"/>
    </div>

    )
}

}






const mapStateToProps = state => {
    return {
        loggedInUser:state.user.loggedInUser
    };
};
// const mapDispatchToProps = {
//     getUserById
// };
export default connect(mapStateToProps, null)(About)