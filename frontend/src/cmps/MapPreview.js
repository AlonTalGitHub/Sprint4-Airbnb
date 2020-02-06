import React, { Component } from 'react';
// import {GoogleMapReact, InfoWindow, Marker} from 'google-map-react';
import GoogleMapReact from 'google-map-react';
import { connect } from 'react-redux';
// import HouseDetails from '../pages/HouseDetails';
import Geocode from "react-geocode";
import MapMarker from './MapMarker'
//MY API KEY HERE:
// const API_KEY=process.env.GMAP_API_KEY
// const AnyReactComponent = ({ text }) => <div>{text}</div>;

class MapPreview extends Component {

    // { lat: 59.3304287, lng: 18.0666493 }
    constructor(props) {
        super(props)
        this.state = {
            center: {
                lat: 59.3304287, //this.props.house.address.coords.lat,
                lng: 18.0666493//this.props.house.address.coords.lng
            },
            zoom: 11
        };
    }
    componentDidMount() {
        Geocode.setApiKey(process.env.REACT_APP_GMAP_API_KEY);

        // set response language. Defaults to english.
        Geocode.setLanguage("en");
    }
    handleChangeMap = ({ center, zoom }) => {
        this.setState({
            center: center,
            zoom: zoom
        });
    }
    blah = async () => {
        Geocode.fromAddress("Eiffel Tower").then(
            response => {
                const { lat, lng } = response.results[0].geometry.location;
                console.log('Eiffel tower', lat, lng);
            },
            error => {
                console.error(error);
            }
        );
    }
    render() {
        // {console.log('Map Preview state is: ',this.state)}
        { this.blah() }
        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: process.env.REACT_APP_GMAP_API_KEY, v: '3.31' }}
                    center={this.state.center}
                    zoom={this.state.zoom}
                    onChange={this.handleChangeMap}
                >
                    <MapMarker style={{ position: 'absolute', transform: 'translate(-50%, -100%)' }} caller={this.props.caller} house={this.props.house} lat={this.props.house.address.coords.lat} lng={this.props.house.address.coords.lng} text="Marker!" />
                </GoogleMapReact>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        // filterBy: state.house.filterBy,
        loggedInUser: state.user.loggedInUser,
        isLoading: state.system.isLoading
    };
};
// const mapDispatchToProps = {
//     // setFilter
//     getUserById
// };

export default connect(mapStateToProps, null)(MapPreview)