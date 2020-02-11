import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavBar from '../cmps/NavBar';
import cabin from '../assets/img/crap1.jpg'
import '../assets/styles/aboutPage.css'
class About extends Component {
    state = {
        user: ''
    }

    render() {
        return (<div className="about-page-container">
            <img src={cabin} alt="" className="about-img" />
            <div className="about-info-container">
                <p>
                    Welcome to the most amazing site in the world!
                    Here you will be able to book a place for your next vacation.
                    So what are you waiting for? 
                    you'r next vacation is only a few clicks away!
                </p>
            </div>
        </div>
        )
    }

}


const mapStateToProps = state => {
    return {
        loggedInUser: state.user.loggedInUser
    };
};

export default connect(mapStateToProps, null)(About)