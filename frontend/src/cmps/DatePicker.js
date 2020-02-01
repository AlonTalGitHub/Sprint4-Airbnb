import React, { Component } from "react";
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import { connect } from 'react-redux';
import { setFilter, filterHouses } from '../actions/HouseActions'
import { DateRangePicker, SingleDatePicker, DayPickerRangeController, toMomentObject } from 'react-dates';
import moment from 'moment'
// import '../assets/styles/index.css'


export default class SearchForm extends Component {

    state = {
        startDate: null,
        endDate: null
    }

    handleChange = (key, date) => {
        this.setState({
            [key]: date
        });
    }
    componentDidMount() {
    }
    sendDates = () => {
        this.props.changeDates({ ...this.state })
    }
    // calculateNights = () => {
    //     const oneDay = 24 * 60 * 60 * 1000;
    //     const { startDate, endDate } = this.state
    //     if (startDate && endDate) {
    //         const numOfnights = (endDate._d - startDate._d) / oneDay
    //         this.props.saveNightNum(numOfnights)
    //     }
    // }
    handleChange=(startDate,endDate)=>{
        this.setState({startDate,endDate},this.sendDates)
    }

    render() {
        // const BAD_DATES = [moment(), moment().add(10, 'days')];
        // const BAD_DATES = [moment('Feb 20th 2020'),moment('Feb 21th 2020')];
        // const isDayBlocked = day => BAD_DATES.filter(d => d.isSame(day, 'day')).length > 0;
            {/* isDayBlocked={isDayBlocked} */}
        return <DateRangePicker

            startDate={this.state.startDate} // momentPropTypes.momentObj or null,
            startDateId="start-date" // PropTypes.string.isRequired,
            endDate={this.state.endDate} // momentPropTypes.momentObj or null,
            endDateId="end-date" // PropTypes.string.isRequired,
            // onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate },()=> this.sendDates())}  // PropTypes.func.isRequired,
            onDatesChange={(startDate,endDate)=>this.handleChange(startDate,endDate)}  // PropTypes.func.isRequired,
            focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
            onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
        />
    }
}