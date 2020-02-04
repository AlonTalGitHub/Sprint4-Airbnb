import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { addHouseReview } from '../../actions/HouseActions';

class ReviewCompose extends Component {

    state = {
        reviewToEdit: {
            "byUser": null,
            "txt": '',
            "rate": 4,
            "createdAt": Date.now(),
        }
    };

    componentDidMount() {
        if (this.props.loggedInUser) this.loadUser();  
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

    loadUser = () => {
        const { _id , username, imgURL } = this.props.loggedInUser;
        const byUser = { _id , username, imgURL }
        this.setState({ reviewToEdit: {...this.state.reviewToEdit, byUser } }, () => console.log(this.state.reviewToEdit));
    }

    addReview = (ev) => {
        ev.preventDefault();
        const review = {...this.state.reviewToEdit}
        this.props.onUpdateReviews(review)
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
                        className="review-textarea"
                        name="txt"
                        onChange={this.handleChange}
                        value={this.state.reviewToEdit.txt}
                    ></textarea>
                    <button className="form-btn pointer">Add</button>
                </form>
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        // houses: state.house.houses,
        //   users: state.user.users,
        loggedInUser: state.user.loggedInUser
    };
};
const mapDispatchToProps = {
    // loadReviews,
    // loadUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewCompose);