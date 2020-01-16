import React, { Component } from "react";
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
// import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import '../assets/styles/index.css'


class SearchForm extends Component {
    state = {
        numOfperson: 1,
        startDate: null,
        endDate: null
    }

    onChangeCap = (diff) => {
        if (this.state.numOfperson === 1 && diff === -1) return
        this.setState(prevState => prevState.numOfperson += diff)
    }

    handleChange = date => {
        this.setState({
            startDate: date
        });
    }

    render() {
        // const [startDate, setStartDate] = useState(null);
        return <div className="search-form flex column space-between">
            {/* <form> */}
            <h2>Feel At Home, Wherever You Go</h2>
            <input className="form-loc" type="text" name="location" placeholder="Where To Go?"></input>
            <div className="form-cap flex space-between align-center">
                <span>How Many People?</span>
                <span className="form-cap-control flex space-between">
                    <button onClick={() => this.onChangeCap(1)} className="form-num-btn pointer">+</button>
                    <span className="form-cap-num">{this.state.numOfperson}</span>
                    <button onClick={() => this.onChangeCap(-1)} className="form-num-btn pointer">-</button>
                </span>
            </div>
            
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
            
            {/* <input type="number" placeholder="How Many?"></input> */}
            <Link onClick={this.handleClick} className="form-btn pointer flex align-center justify-center" to="/house">Search</Link>
            {/* <button className="form-btn pointer" >Search</button> */}
            {/* </form> */}
        </div>
    }

}

export default SearchForm