import React, { Component } from "react";
import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import { connect } from 'react-redux';
import { setFilter, filterHouses } from '../actions/HouseActions'
import countries from '../services/CountryService'
// import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import '../assets/styles/index.css'


class SearchBar extends Component {
    state = {
        filterBy: this.props.filterBy,
        isMenuOpen: false,
        suggestions: [],
        text: ''

    }

    componentDidMount() {
        console.log(this.props.filterBy)
        this.setState({ filterBy: this.props.filterBy }, console.log(this.state))
    }


    onChange = (ev) => {
        const key = ev.target.name
        const value = ev.target.value
        const filterBy = { ...this.state.filterBy }
        filterBy[key] = value
        this.setState({ filterBy }, () => this.props.filterHouses(filterBy))
    }

    handleFocus = () => {
        this.props.openMenu()

    }

    onTextChange = (e) => {
        const value = e.target.value;
        let options = [];
        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');
            options = countries.sort().filter(v => regex.test(v))
        }       

        const suggestions = ['Anywhere', ...options]
        this.setState(() => ({
            suggestions,
            text: value
        }))
    }

    selectedText(value) {
        if(value==='Anywhere') value=''
        const filterBy = { ...this.props.filterBy }
        filterBy.location = value

        this.setState({
            text: value,
            suggestions: [],
            filterBy: filterBy
        }, () => this.props.filterHouses(filterBy))
    }

    renderSuggestions = () => {
        let { suggestions } = this.state;
        if (suggestions.length === 0) {
            return null;
        }
        return (
            <ul style={{ "position": "absolute", "backgroundColor": "white" }} >
                {
                    suggestions.map((item, index) => (<li key={index} onClick={() => this.selectedText(item)}>{item}</li>))
                }
            </ul>
        );
    }

    render() {
        const { text, suggestions } = this.state;
        return <div className="flex column">

            {/* <input onFocus={this.handleFocus} onChange={this.onChange} className="form-loc" value={this.props.filterBy.location} type="text" name="location" placeholder="Where?"></input> */}
            <input autoComplete="off" onFocus={this.handleFocus} onChange={this.onTextChange} className="form-loc" value={text} type="text" name="location" placeholder="Where?"></input>
            <div> {this.renderSuggestions()}</div>


        </div>

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