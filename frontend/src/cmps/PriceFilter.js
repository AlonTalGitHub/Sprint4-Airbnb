import React, { Component } from "react";
import DatePicker from "react-datepicker";

import '../assets/styles/filters.css'

import { connect } from 'react-redux';
import { setFilter, filterHouses } from '../actions/HouseActions'
// import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import '../assets/styles/index.css'
import { Link } from "react-router-dom";

export default class PriceFilter extends Component {
    state = {
        isMenuOpen: false,
        // price: this.props.price || 1000
    }

    onToggleMenu = () => {
        this.setState((prevState => prevState.isMenuOpen = !prevState.isMenuOpen))

    }

    onSaveFilter = () => {
        console.log('on save called ')
        this.onToggleMenu()
        // this.props.onChangePrice(this.state.price)
        this.props.saveFilter()
    }

    onChange = (ev) => {
        // this.setState({ price: +ev.target.value })
        this.props.onChangePrice(+ev.target.value)     

    }

    render() {
        const { isMenuOpen } = this.state
        return <React.Fragment>
            <div className="filter-container pointer flex column">
                <button onClick={this.onToggleMenu} className="filter-btn">Price</button>
                <div className={`filter-menu ${(isMenuOpen) ? 'shown-filter column space-between' : ''}`}>
                    <input onChange={this.onChange} type="range" name="price" value={this.props.price} min="50" max="1000"></input>
                    <label htmlFor="price" >${this.props.price}</label>
                    <Link to="/house">
                        <button onClick={this.onSaveFilter} className="save-filter-btn pointer">Save</button>
                    </Link>

                </div>
            </div>
        </React.Fragment>
    }
}