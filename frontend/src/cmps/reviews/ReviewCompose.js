import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addReview } from '../../actions/ReviewActions.js';
import { saveHouse } from '../../actions/HouseActions';

class ReviewCompose extends Component {

    state = {
        reviewToEdit: {
            "byUser": {
                "_id": "123456789",
                "fullName": "User",
                "img": "http://img"
            },
            "txt": '',
            "rate": 4,
            "createdAt": "2020-01-15T07:51:18.138Z",
        }
    };

    componentDidMount() {
        this.setState(prevState => ({
            reviewToEdit: {
                ...prevState.reviewToEdit,
                aboutHouseId: this.props.house._id
            }
        }));
    }

    handleChange = ev => {
        const { name, value } = ev.target;
        this.setState(prevState => ({
            reviewToEdit: {
                ...prevState.reviewToEdit,
                [name]: value
            }
        }));
    };

    addReview = ev => {
        ev.preventDefault();
        const { house } = this.props
        let updatedHouse = {...house}
        console.log(updatedHouse);
        
        updatedHouse.reviews.push(this.state.reviewToEdit)
        this.props.saveHouse(updatedHouse);
        this.setState(prevState => ({
            reviewToEdit: {
                ...prevState.reviewToEdit,
                "txt": ''
            }
        }));
    };


    render() {
        return (
            <section>
                <form onSubmit={this.addReview}>
                    <textarea
                        name="txt"
                        onChange={this.handleChange}
                        value={this.state.reviewToEdit.txt}
                    ></textarea>
                    <button>Add</button>
                </form>
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        houses: state.house.houses,
        //   users: state.user.users,
        //   loggedInUser: state.user.loggedInUser
    };
};
const mapDispatchToProps = {
    // loadReviews,
    // loadUsers,
    saveHouse
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewCompose);

