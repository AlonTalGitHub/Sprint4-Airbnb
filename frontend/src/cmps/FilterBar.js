import React, { Component } from "react";

import { connect } from 'react-redux';
import { setFilter, filterHouses } from '../actions/HouseActions'

import '../assets/styles/index.css'
import CapacityFilter from './CapacityFilter';
import DatePicker from './DatePicker'
import moment from 'moment'
import PriceFilter from "./PriceFilter";
import { Redirect } from "react-router";
// import history from "../history";

class FilterBar extends Component {
    state = {
        filterBy: { ...this.props.filterBy },
        startDate: null,
        endDate: null
    }

    componentDidMount() {
        console.log('filter bar', this.state.filterBy)
        
    }

    componentDidUpdate(prevProps) {
        if (prevProps.filterBy !== this.props.filterBy) {
            this.setState({ filterBy: { ...this.props.filterBy } }, () => console.log(this.state.filterBy))
        }

    }

    changeDates = (userDates) => {
        let startDate = moment.utc(userDates.startDate).format()
        let endDate = moment.utc(userDates.endDate).format()
        let newDates = { startDate: startDate, endDate: endDate }
        this.setState({ filterBy: { ...this.state.filterBy, ...newDates } }, this.saveFilter)
    }

    onChangeCap = (diff, key) => {
        console.log('cap change before', this.state.filterBy)
        if (this.state.filterBy[key] === 1 && diff === -1) return
        this.setState(prevState => prevState.filterBy[key] += diff, () => console.log('cap change filter bar', this.state.filterBy))
    }

    onChangePrice = (val) => {
        console.log('onchange price called')        
        // this.setState(prevState => prevState.filterBy.price = val, ()=>console.log('changeprice',this.state))
        this.setState(prevState => prevState.filterBy.price=val,() => console.log('price change filter bar', this.state.filterBy))

    }

    saveFilter = () => {
        console.log('save filter filter bar')
        this.props.filterHouses(this.state.filterBy)      
    }

    updateState = () => {
        const filter = { ...this.props.filterBy }
        // console.log(filter)
        this.setState({ filterBy: filter }, this.saveFilter)
    }

    render() {
        const { filterBy } = this.state
        return <React.Fragment>
            <div className="flex">
                <CapacityFilter updateState={this.updateState}
                    saveFilter={this.saveFilter} filterBy={filterBy} onChangeCap={this.onChangeCap}>
                </CapacityFilter>
                <PriceFilter price={this.state.filterBy.price} saveFilter={this.saveFilter} onChangePrice={this.onChangePrice}></PriceFilter>
            {/* <DatePicker changeDates={this.changeDates}></DatePicker> */}
            </div>


        </React.Fragment>


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

export default connect(mapStateToProps, mapDispatchToProps)(FilterBar)