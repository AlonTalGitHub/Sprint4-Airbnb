import React, { Component } from "react";
import { Link } from 'react-router-dom';
import DatePicker from '../cmps/DatePicker';
import "react-datepicker/dist/react-datepicker.css";
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import { connect } from 'react-redux';
import { setFilter, filterHouses } from '../actions/HouseActions'
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import '../assets/styles/index.css'


class SearchForm extends Component {
    state = {
        filterBy: {
            numOfperson: 1,
            location: '',
            nightsNum:1
        },
        startDate: null,
        endDate: null
    }

    onChangeCap = (diff,key) => {
        if (this.state.filterBy[key] === 1 && diff === -1) return
        this.setState(prevState => prevState.filterBy[key] += diff,()=>console.log(this.state))
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
        this.props.filterHouses(this.state.filterBy)
    }

    saveNightNum=(val)=>{
        const filterBy={...this.state.filterBy}
        filterBy.nightsNum=val
        this.setState({filterBy},console.log(this.state))
    }

    render() {
        // const [startDate, setStartDate] = useState(null);
        return <div className="search-form flex column space-between">
            {/* <form> */}
            <h2>Book with Turtle House and feel At Home, Wherever You Go</h2>
            <input onChange={this.onChange} className="form-loc" value={this.state.filterBy.loc} type="text" name="location" placeholder="Where To Go?"></input>
            <div className="form-cap flex space-between align-center">
                <span>How Many People?</span>
                <span className="form-cap-control flex space-between">
                    <button onClick={() => this.onChangeCap(1,'numOfperson')} className="form-num-btn pointer" name="numOfperson">+</button>
                    <span className="form-cap-num">{this.state.filterBy.numOfperson}</span>
                    <button onClick={() => this.onChangeCap(-1,'numOfperson')} className="form-num-btn pointer" name="numOfperson">-</button>
                </span>                
            </div>
            <DatePicker saveNightNum={this.saveNightNum} ></DatePicker>
            {/* <div className="form-cap flex space-between align-center">
                <span>How Many nights?</span>
                <span className="form-cap-control flex space-between">
                    <button onClick={() => this.onChangeCap(1,'nightsNum')} className="form-num-btn pointer" name="nights">+</button>
                    <span className="form-cap-num">{this.state.filterBy.nightsNum}</span>
                    <button onClick={() => this.onChangeCap(-1,'nightsNum')} className="form-num-btn pointer" name="nights">-</button>
                </span>                
            </div> */}

           
                

            {/* <Link onClick={this.handleClick} className="form-btn pointer flex align-center justify-center" to="/house">Search</Link> */}
            <Link className="align-self" to="/house">
                <button onClick={this.onSearch} className="form-btn pointer flex align-center justify-center">Search</button>
            </Link>
            {/* <button className="form-btn pointer" >Search</button> */}
            {/* </form> */}
        </div>
    }

}

const mapStateToProps = state => {
    return {
        filterBy: state.house.filterBy
    };
};
const mapDispatchToProps = {
    setFilter,
    filterHouses
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm)

// export default SearchForm