import React from 'react';
import { connect } from 'react-redux';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import { Icon } from 'antd';
const mapStateToProps = state => ({
    ...state.search,
    ...state.auth
});

const mapDispatchToProps = dispatch => ({

});

class MapComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
        this.handleToggle = this.handleToggle.bind(this);
    }
    componentDidMount() {
        this.props.onRef(this);
    }

    handleToggle(e) {
        if (this.props.locationDetail === false) {
            this.setState({ data: this.props.availableKrossBoxLocation })
            this.state.data.map((marker, index) => {
                if (parseFloat(e.latLng.lat().toFixed(5)) === parseFloat(marker.latitude.toFixed(5)) && parseFloat(e.latLng.lng().toFixed(5)) === parseFloat(marker.longitude.toFixed(5))) {
                    marker.IsOpen = true;
                    return marker;
                } else {
                    marker.IsOpen = false;
                    return marker;
                }
            });
            this.setState({ data: this.state.data });
        }
        else {
            var currentLocation = e;
            currentLocation.map((marker, index) => {
                if (parseFloat(e[0].latitude.toFixed(5)) === parseFloat(marker.latitude.toFixed(5)) && parseFloat(e[0].longitude.toFixed(5)) === parseFloat(marker.longitude.toFixed(5))) {
                    marker.IsOpen = true;
                    return marker;
                } else {
                    marker.IsOpen = false;
                    return marker;
                }
            });
            this.setState({ data: currentLocation });
        }
    }

    handleToggleClose = () => {
        this.state.data.map((marker, index) => {
            marker.IsOpen = false;
            return marker;
        });
    }
    render() {
        var test = this.props.krossboxLocation;
        const GoogleMapExample = withGoogleMap(props => (
            <GoogleMap
                defaultZoom={10}
                defaultCenter={{ lat: this.props.latitude ? this.props.latitude : 28.632986, lng: this.props.longitude ? this.props.longitude : 77.219374 }}
            >
                {props.availableKrossBoxLocation.length && props.availableKrossBoxLocation.length > 0 ? props.availableKrossBoxLocation.map((marker, index) =>
                    props.isMarkerShown && <Marker
                        label={{ text: "" + (index + 1) + "", color: "white" }} key={index} onClick={props.onToggleOpen} position={{ lat: marker.latitude, lng: marker.longitude }}>
                        {marker.IsOpen &&
                            <InfoWindow key={index} onCloseClick={props.onToggleClose}>
                                <div className="map-marker-window">
                                    <div className="row">
                                        <div>
                                            <img alt="locker" src="https://www.habitatmag.com/var/ezwebin_site/storage/images/publication-content/2017/2017-january/featured-articles/package-lockers/705379-1-eng-US/xPackage-Lockers_responsive_reference.png.pagespeed.ic.GCc-ZcYzCI.jpg" style={{ width: '317px', height: '200px' }} />
                                        </div>
                                        <div className="col-12 location-address-style pt10">
                                            <Icon type="environment" theme="twoTone" style={{ fontSize: '20px', color: '#ECAD75', padding: '5px' }} /> {marker.address1}, {marker.address2}

                                        </div>
                                        <div className="col-4 location-address-style">
                                            {marker.address4}
                                        </div>
                                    </div>
                                </div>
                            </InfoWindow>
                        }
                    </Marker>
                ) : []
                }
            </GoogleMap>
        ));

        return (
            <div>
                <GoogleMapExample
                    isMarkerShown
                    onToggleOpen={this.handleToggle}
                    onToggleClose={this.handleToggleClose}
                    availableKrossBoxLocation={this.props.locationDetail === false ? (this.props.availableKrossBoxLocation ? this.props.availableKrossBoxLocation : []):  (this.props.krossboxLocation ? this.props.krossboxLocation : [])}
                    containerElement={<div style={{ height: `675px`, width: 'auto' }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapComponent);