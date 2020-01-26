import React, { Component } from "react";
import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import { connect } from 'react-redux';
import { setFilter, filterHouses } from '../actions/HouseActions'
// import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import '../assets/styles/index.css'
import CapacityFilter from "./CapacityFilter";

class FilterBar extends Component{
    state = {
        filterBy: this.props.filterBy,
        startDate: null,
        endDate: null
    }

    componentDidMount(){
        console.log('filter bar',this.state.filterBy)
    }

    onChangeCap = (diff,key) => {
        console.log('cap change before',this.state.filterBy)
        if (this.state.filterBy[key] === 1 && diff === -1) return
        this.setState(prevState => prevState.filterBy[key] += diff,()=>console.log('cap change filter bar',this.state.filterBy))
    }

    saveFilter=()=>{
       this.props.filterHouses(this.state.filterBy)
    }

    updateState=()=>{
        const filter={...this.props.filterBy}
        console.log(filter)
        this.setState({filterBy:filter})
    }
    
    render(){
        const {filterBy}=this.state
        return <React.Fragment>
            <CapacityFilter updateState={this.updateState}
             saveFilter={this.saveFilter} filterBy={filterBy} onChangeCap={this.onChangeCap}>

             </CapacityFilter>
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