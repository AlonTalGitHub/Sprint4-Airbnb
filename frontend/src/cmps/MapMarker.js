import React, { Component } from 'react';
//style={{ 'width': '30px', 'height': '30px', 'background-color': 'green', 'border-radius': '50%' }}
import TurtleMarker from '../assets/img/pagin_turtle.png'
export default class MapMarker extends Component {
    render() {
        console.log('MapMarker props: ',this.props)
        return (
            <div className="map-marker-container">
                {(this.props.caller === "housedetails") ? '' : <span className="map-marker-price">{'$' + this.props.house.price}</span>}
                <div className="map-marker-sub-container">
                    {/* <span>{props.lat}</span>
              <span>{props.lng}</span>
              <span>{props.text}</span> */}
                    <div className="map-marker-img-container">
                        <img src={TurtleMarker} alt="" className="map-marker" />
                    </div>
                </div>
            </div>
        )
    }
}
