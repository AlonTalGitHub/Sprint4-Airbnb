import React, { Component } from "react";
import { Link } from 'react-router-dom'


class SearchForm extends Component {

    handleClick=()=>{

    }

    render() {
        return <div>
            {/* <form> */}
                <input type="text" name="location" placeholder="Where To Go?"></input>
                <input type="number" placeholder="How Many?"></input>
                <Link to="/house"><button onClick={this.handleClick}>Search</button></Link>
            {/* </form> */}
        </div>
    }

}

export default SearchForm