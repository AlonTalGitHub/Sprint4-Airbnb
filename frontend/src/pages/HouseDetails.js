import React, { Component } from 'react';
// import { connect } from 'react-redux';


export default class HouseDetails extends Component {

    render() {
        return (
            <section className="housedetails-container">
                <ul>
                    {this.houses.map(house => (
                        <li key={house._id}>
                            <HousePreview house={house} />
                        </li>
                    ))}
                </ul>
            </section>
        )
    }
}


// const mapStateToProps = state => {
//     return {
//     };
//   };
//   const mapDispatchToProps = {
//   };
  
//   export default connect(mapStateToProps, mapDispatchToProps)(HouseDetails)