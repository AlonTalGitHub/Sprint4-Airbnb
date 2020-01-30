import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveHouse } from '../../actions/HouseActions';

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
        this.loadUser()  
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

    addReview = async (ev) => {
        ev.preventDefault();
        try {
            const { house } = this.props
            console.log(house)
            let updatedHouse = {...house}
            console.log(updatedHouse);
            updatedHouse.reviews.push(this.state.reviewToEdit)
            await this.props.saveHouse(updatedHouse);
            this.setState(prevState => ({
                reviewToEdit: {
                    ...prevState.reviewToEdit,
                    "txt": ''
                }
            }));
        } catch (error) {
            console.log('add review to house faild');
            throw error;
            
        }
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
        houses: state.house.houses,
        //   users: state.user.users,
        loggedInUser: state.user.loggedInUser
    };
};
const mapDispatchToProps = {
    // loadReviews,
    // loadUsers,
    saveHouse
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewCompose);

