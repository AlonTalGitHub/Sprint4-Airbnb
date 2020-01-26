import React, { Component } from "react";
import DatePicker from "react-datepicker";

import '../assets/styles/filters.css'

import { connect } from 'react-redux';
import { setFilter, filterHouses } from '../actions/HouseActions'
// import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import '../assets/styles/index.css'

export default class CapacityFilter extends Component {
    state = {
        isMenuOpen: false
    }

    onToggleMenu = () => {
        this.setState((prevState => prevState.isMenuOpen = !prevState.isMenuOpen),()=>this.props.updateState())
    }

    onSaveFilter = () => {
        this.onToggleMenu()
        this.props.saveFilter()
    }

    render() {
        const { isMenuOpen } = this.state
        return <React.Fragment>
            <button onClick={this.onToggleMenu} className="filter-btn">Guests</button>
            <div className={`filter-menu ${(isMenuOpen) ? 'shown-filter column space-between' : ''}`}>
                <span className="form-cap-control flex space-between align-center">
                    <button onClick={() => this.props.onChangeCap(1, 'numOfperson')} className="filter-num-btn pointer" name="numOfperson">+</button>
                    <span className="form-cap-num">{this.props.filterBy.numOfperson}</span>
                    <button onClick={() => this.props.onChangeCap(-1, 'numOfperson')} className="filter-num-btn pointer" name="numOfperson">-</button>
                </span>
                <button onClick={this.onSaveFilter} className="save-filter-btn pointer">Save</button>
            </div>
        </React.Fragment>
    }
}