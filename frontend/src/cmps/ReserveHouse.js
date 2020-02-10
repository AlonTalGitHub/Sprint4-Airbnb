// import React, { Component } from "react";
// export default class HousePreview extends Component {
//     state = {

//     }


// }
import React, { Component } from "react";
import { Link } from 'react-router-dom';
import DatePicker from '../cmps/DatePicker';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import { connect } from 'react-redux';
import { setFilter } from '../actions/HouseActions'
// import { saveOrder } from '../actions/OrderActions'
import { getUserById } from '../actions/UserActions'
import '../assets/styles/index.css'
import Order from "../services/Order.js";
import localStorageService from "../services/localStorageService";
import UserService from "../services/UserService";
import OrderService from "../services/OrderService";
import { saveOrder } from "../actions/OrderActions";
import moment from 'moment'
class ReserveHouse extends Component {
    state = {
        filterBy: {
            numOfperson: 1,
            location: ''
        },

        startDate: null,
        endDate: null


    }

    onChangeCap = async (diff) => {
        if (this.state.filterBy.numOfperson === 1 && diff === -1) return
        if (this.state.filterBy.numOfperson + diff > this.props.house.capacity) return
        this.setState(prevState => prevState.filterBy.numOfperson += diff)
    }

    onChange = (ev) => {
        const key = ev.target.name
        const value = ev.target.value
        const filterBy = { ...this.state.filterBy }
        filterBy[key] = value
        this.setState({ filterBy })
    }

    onSearch = () => {
        this.props.setFilter(this.state.filterBy)
    }
    onReserve = async (ev) => {
        ev.preventDefault();
        if (!this.state.startDate && !this.state.endDate) {
            alert('choose dates!')
            return;
        }
        const user = this.props.loggedInUser;
        if (!user) {
            alert('login first!')
            return;
        }
        // debugger
        // console.log('ReserveHouse, user is: ', this.props.loggedInUser);
        //.format("MMM Do YYYY")
        console.log('reserve btn: ', this.state)
        let dates = { startDate: this.state.startDate._d, endDate: this.state.endDate._d }
        console.log('the dates the user chose: ', dates)//{ startDate: dates.startDate._d, endDate: dates.endDate._d }) }
        let houseOrder = new Order(this.props.house._id, user._id, this.state.filterBy.numOfperson);
        //this.state.startDate._d
        houseOrder.startDate = dates.startDate
        houseOrder.endDate = dates.endDate
        try {
            await this.props.saveOrder(houseOrder)
            console.log('orders are: ', this.props.orders)
            let orders = this.props.orders
            let storedOrderId = orders[orders.length - 1]._id
            user.reserved.push(storedOrderId)
            await UserService.update(user)
        }
        catch (err) {
            console.log('ReserveHouse: add house failed', err)
            throw err;
        }
        finally {
            console.log('check your reserved items ')
        }

    }

    addReserveClass = () => {
        if (!this.props.detailsPage) {
            return "search-form flex column space-between"
        }
        else {
            return "search-form flex column space-between reserve-form"
        }
    }
    changeDates = (userDates) => {
        console.log('before setState :', userDates)
        this.setState({ ...this.state, ...userDates })
    }
    getTotalPrice = () => {
        if (!this.state.startDate || !this.state.endDate) return (<span></span>)        
        else return (< span className="reserve-price-tag-total">{'Total: $' + this.props.house.price * (this.state.endDate-this.state.startDate)/1000/60/60/24}</span>)
    }
    render() {
        // const [startDate, setStartDate] = useState(null);
        const { house } = this.props;
        return (
            <div className={this.addReserveClass()}>
                <h3 className="reserve-form-header">Reserve Now!</h3>
                {/* <input onChange={this.onChange} className="form-loc" value={this.state.filterBy.loc} type="text" name="location" placeholder={house.address.country + " | " + house.title}></input> */}
                <h4 className="reserve-form-house-name">{house.address.country + " | " + house.title}</h4>
                <DatePicker changeDates={this.changeDates}></DatePicker>
                <div className="form-cap flex space-between align-center">
                    <span>Number of Guests</span>
                    <span className="form-cap-control flex space-between">
                        <button onClick={() => this.onChangeCap(-1)} className="form-num-btn pointer minus" name="numOfperson">-</button>
                        <span className="form-cap-num">{this.state.filterBy.numOfperson}</span>
                        <button onClick={() => this.onChangeCap(1)} className="form-num-btn pointer" name="numOfperson">+</button>
                    </span>
                </div>
                <span className="reserve-price-tag">${house.price}/night</span>
                {this.getTotalPrice()}
                <Link to="/house">
                    <button onClick={this.onReserve} className="form-btn pointer flex align-center justify-center reserve-btn">Reserve</button>
                </Link>
            </div>)

    }
}

const mapStateToProps = state => {
    return {
        filterBy: state.house.filterBy,
        loggedInUser: state.user.loggedInUser,
        orders: state.order.orders
    };
};
const mapDispatchToProps = {
    // setFilter
    saveOrder,
    getUserById,
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