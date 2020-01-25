// import React, { Component } from "react";
// export default class HousePreview extends Component {
//     state = {

//     }


// }
import React, { Component } from "react";
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import { connect } from 'react-redux';
import { setFilter } from '../actions/HouseActions'
// import { saveOrder } from '../actions/OrderActions'
import { getUserById } from '../actions/UserActions'
import '../assets/styles/index.css'
import Order from "../services/Order.js";
import localStorageService from "../services/localStorageService";

class ReserveHouse extends Component {
    state = {
        filterBy: {
            numOfperson: 1,
            location: ''
        },
        startDate: null,
        endDate: null,

    }

    onChangeCap = async (diff) => {
        if (this.state.filterBy.numOfperson === 1 && diff === -1) return
        this.setState(prevState => prevState.filterBy.numOfperson += diff)
        // ////////////////////////////////////////////////
        // await this.props.getUserById('1234')
        // const users=this.props.users
        // console.log('\nturlak turlak turlak\n',users,'\nturlak turlak turlak\n')
        // ///////////////////////////////////////////////
    }

    onChange = (ev) => {
        const key = ev.target.name
        const value = ev.target.value
        const filterBy = { ...this.state.filterBy }
        filterBy[key] = value
        this.setState({ filterBy })
    }

    handleChange = date => {
        this.setState({
            startDate: date
        });
    }

    onSearch = () => {
        this.props.setFilter(this.state.filterBy)
    }
    onReserve = async (ev) => {
        ev.preventDefault();
        let houseOrder = new Order(this.props.house._id, 1234, this.state.filterBy.numOfperson);
        localStorageService.store('order', houseOrder)
        ////////////////////////////////////////////////

        // console.log('\nturlak turlak turlak\n',user,'\nturlak turlak turlak\n')
        ///////////////////////////////////////////////
        try {
            await this.props.getUserById('1234');
            const user = this.props.loggedInUser;

            // user.reserved.push(houseOrder)
            console.log('before sending', user)
            user.reserved.push(houseOrder)
            console.log('before sending+push', user)
            await this.props.saveOrder(user)
            console.log('new order reserved')
            alert('Order reserved');
        }
        catch{
            console.log('add house failed')
        }

    }

    // onSaveHouse = async (ev) => {
    //     ev.preventDefault()
    //     try {
    //         await this.props.saveHouse(this.state.newHouse)
    //         this.setState({ isModalShown: true })
    //     }
    //     catch{
    //         console.log('add house failed')
    //     }
    // }
    addReserveClass = () => {
        if (!this.props.detailsPage) {
            return "search-form flex column space-between"
        }
        else {
            return "search-form flex column space-between reserve-form"
        }
    }

    render() {
        // const [startDate, setStartDate] = useState(null);
        const { house } = this.props;
        return (
            <div className={this.addReserveClass()}>
                <h4>Reserve now</h4>
                <input onChange={this.onChange} className="form-loc" value={this.state.filterBy.loc} type="text" name="location" placeholder={house.address.country + " | " + house.title}></input>
                <div className="form-cap flex space-between align-center">
                    <span>How Many People?</span>
                    <span className="form-cap-control flex space-between">
                        <button onClick={() => this.onChangeCap(1)} className="form-num-btn pointer" name="numOfperson">+</button>
                        <span className="form-cap-num">{this.state.filterBy.numOfperson}</span>
                        <button onClick={() => this.onChangeCap(-1)} className="form-num-btn pointer" name="numOfperson">-</button>
                    </span>
                </div>

                <Link to="/house">
                    <button onClick={this.onReserve} className="form-btn pointer flex align-center justify-center">RESERVE</button>
                </Link>
            </div>)

}
}

const mapStateToProps = state => {
    return {
        filterBy: state.house.filterBy,
        loggedInUser: state.user.users
    };
};
const mapDispatchToProps = {
    // setFilter
    // saveOrder,
    getUserById
};

export default connect(mapStateToProps, mapDispatchToProps)(ReserveHouse)











{/* <DateRangePicker
    startDate={this.state.startDate} // momentPropTypes.momentObj or null,
    startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
    endDate={this.state.endDate} // momentPropTypes.momentObj or null,
    endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
    onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
    focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
    onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
/>
 */}