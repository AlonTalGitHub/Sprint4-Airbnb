// class MapPreview extends Component {

//     state = {}

//     render() {

//         return (
//             <div>


//             </div>
//         )
//     }


// }
// const mapStateToProps = state => {
//     return {
//         loggedInUser: state.user.loggedInUser
//     };
// };
// const mapDispatchToProps = {
//     updateUser
// };

// export default connect(mapStateToProps, mapDispatchToProps)(MapPreview)
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import HouseDetails from '../pages/HouseDetails';
import MapMarker from './MapMarker'
const MY_GMAP_API_KEY = 'AIzaSyAn8p53vq-FNZpiqERRc0rXHhGejVaB-Bc';
const AnyReactComponent = ({ text }) => <div>{text}</div>;

class MapPreview extends Component {
    state = {
        center: {
            lat: this.props.house.address.coords.lat,
            lng: this.props.house.address.coords.lng
        },
        zoom: 11
    };

    render() {
        console.log('house coords: ', this.state.center)
        console.log('MapPreview props', this.props)
        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: MY_GMAP_API_KEY }}
                    defaultCenter={this.state.center}
                    defaultZoom={this.state.zoom}
                >
                <MapMarker caller={this.props.caller} house={this.props.house} lat={this.props.house.address.coords.lat}  lng={this.props.house.address.coords.lng} text="Marker!"/>
                </GoogleMapReact>
            </div>
        );
    }
}

export default MapPreview;