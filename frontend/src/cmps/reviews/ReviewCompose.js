import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addReview } from '../../actions/ReviewActions.js';

class ReviewCompose extends Component {

    state = {
        reviewToEdit: {
            "byUser": {
                "_id": "123456789",
                "fullName": "User",
                "img": "http://img"
            },
            "txt": '',
            "aboutHouseId": ''
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
        this.props.addReview(this.state.reviewToEdit);
        this.setState({
            reviewToEdit: {
                txt: '', 
                byUser: {
                    "_id": "123456789",
                    "fullName": "User",
                    "img": "http://img"
                },
                aboutHouseId: this.props.house._id
            }
        });
    };


    render() {
        // const { house } = this.props
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
        reviews: state.review.reviews,
        //   users: state.user.users,
        //   loggedInUser: state.user.loggedInUser
    };
};
const mapDispatchToProps = {
    // loadReviews,
    // loadUsers,
    addReview
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewCompose);

