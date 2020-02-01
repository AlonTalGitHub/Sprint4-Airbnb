import React, { Component } from 'react';
import {GoogleMapReact, InfoWindow, Marker} from 'google-map-react';
// import HouseDetails from '../pages/HouseDetails';
import MapMarker from './MapMarker'
//MY API KEY HERE:
// const API_KEY=process.env.GMAP_API_KEY
const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default class MapPreview extends Component {
    constructor(props){
        super(props)
        this.state={
            center: {
                lat: this.props.house.address.coords.lat,
                lng: this.props.house.address.coords.lng
            },
            zoom: 11
        };
    }

    render() {
        {console.log('Map Preview state is: ',this.state)}
        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '100vh', width: '100%' }}>
                {/* <GoogleMapReact
                    bootstrapURLKeys={{ key:process.env.REACT_APP_GMAP_API_KEY }}
                    defaultCenter={this.state.center}
                    defaultZoom={this.state.zoom}
                >
                <MapMarker caller={this.props.caller} house={this.props.house} lat={this.state.center.lng} text="Marker!"/>
                </GoogleMapReact> */}
            </div>
        );
    }
}
