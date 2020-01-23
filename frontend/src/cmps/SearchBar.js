import React, { Component } from "react";
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import { connect } from 'react-redux';
import { setFilter,filterHouses } from '../actions/HouseActions'
// import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import '../assets/styles/index.css'


class SearchBar extends Component {
    state = {
        filterBy: this.props.filterBy,           
    
    }

    componentDidMount(){
        console.log(this.props.filterBy)
        this.setState({filterBy:this.props.filterBy})

    }
    

    onChange = (ev) => {
        const key = ev.target.name
        const value = ev.target.value
        const filterBy = { ...this.state.filterBy }
        filterBy[key] = value
        this.setState({ filterBy },()=>this.props.filterHouses(filterBy))
    }

    // handleChange = date => {
    //     this.setState({
    //         startDate: date
    //     });
    // }

    // onSearch = () => {
    //     this.props.setFilter(this.state.filterBy)
    // }

    render() {
        // const [startDate, setStartDate] = useState(null);
        return <input onChange={this.onChange} className="form-loc" value={this.props.filterBy.location} type="text" name="location" placeholder="Where?"></input>
        
    }

}

const mapStateToProps = state => {
    return {
        filterBy: state.house.filterBy
    };
};
const mapDispatchToProps = {
    filterHouses,
    setFilter
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)

// export default SearchForm