import React, { Component } from "react";
import HousePreview from "./HousePreview";
import { withRouter } from 'react-router-dom';


class HouseList extends Component {

    getClassAddition = () => {
        let caller = this.props.location.pathname        
        switch (caller) {
            case '/':
                return "home-list";
            case '/favorites':
                return "favorite-list";
            case '/myhouses':                
                return "my-houses";
            case '/house':
                return "house-page";
            default:
                return "";
        }

    }

    render() {
        const { houses } = this.props

        return (
            <section className={"house-container " + this.getClassAddition()}>

                <ul className={"house-list clean-list " + this.getClassAddition()}>
                    {houses.map((house, idx) => (
                        <li key={house._id}>
                            <HousePreview house={house} />
                        </li>
                    ))}
                </ul>
            </section>
        )
    }
}
export default HouseList = withRouter(HouseList)