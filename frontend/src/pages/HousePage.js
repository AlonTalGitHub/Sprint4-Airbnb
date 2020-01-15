import React, { Component } from 'react';
// import { connect } from 'react-redux';
import HouseList from '../cmps/HouseList'


export default class HousePage extends Component {

    render() {
        return (
            <HouseList></HouseList>
        )
    }
}


// const mapStateToProps = state => {
//     return {
//     };
//   };
//   const mapDispatchToProps = {
//   };
  
//   export default connect(mapStateToProps, mapDispatchToProps)(HousePage)