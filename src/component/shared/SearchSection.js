import React from 'react';
import { Form, Icon, Button } from 'antd';
import Geocode from "react-geocode";
import { connect } from 'react-redux';
import { krossBoxDetailsRef, geoFire } from '../../config';
import LocationAutocomplete from 'location-autocomplete';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import {
    SEARCH_SECTION_LOADED,
    SEARCH_LOCATION,
    GET_LOCATIONS,
    SET_LAT_LONG
} from '../../constants/actionTypes';

const FormItem = Form.Item;
const mapStateToProps = state => ({
    ...state.search,
    ...state.auth
});

const mapDispatchToProps = dispatch => ({
    onLoad: (value) =>
        dispatch({ type: SEARCH_SECTION_LOADED, value }),
    onSelectField: (value) =>
        dispatch({ type: SEARCH_LOCATION, value }),
    onSubmit: (payload) =>
        dispatch({ type: GET_LOCATIONS, payload }),
    onUpdateField:(value) =>
        dispatch({ type: SET_LAT_LONG, value })
});

class SearchSection extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedLocation: '',
            latLng: {},
            lat: "",
            long: ""
        }
        this.getLocation = this.getLocation.bind(this);
        this.getKrossBoxLocation = this.getKrossBoxLocation.bind(this);
    }

    componentWillMount() {
        this.props.onLoad(this.props.isHomePage);
    }

    onDropdownSelect = (component) => {
        const place = component.autocomplete.getPlace();
        this.setState({ selectedLocation: place.name });
        this.props.form.setFieldsValue({
            location: place.formatted_address,
        });
        this.props.onSelectField(place.formatted_address);
        geocodeByAddress(place.formatted_address)
            .then(results => getLatLng(results[0]))
            .then(latLng => this.getKrossBoxLocation(latLng))
            .catch(error => console.error('Error', error));
    }

    getKrossBoxLocation = (latLng) => {
        var that = this;
        var krossBoxId = [];
        var searchResult = [];

        this.props.onUpdateField(latLng);

        if (latLng.lat != null && latLng.lng) {
            var geoQuery = geoFire.query({
                center: [parseFloat(latLng.lat), parseFloat(latLng.lng)],
                radius: 15
            });

            var onKeyEnteredRegistration = geoQuery.on("key_entered", function (key) {
                krossBoxId.push(key);
            });

            geoQuery.on("ready", function () {
                const result = krossBoxId.map(id => {
                    return krossBoxDetailsRef.child(id).once("value", function (snapshot) {
                        searchResult.push(snapshot.val());
                    });
                })
                Promise.all(result)
                    .then(() => {
                        onKeyEnteredRegistration.cancel();
                        that.props.onSubmit(searchResult);
                    })
                    .catch(err => {
                    })
            });
        }
    }

    getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition);
        } else {
            <div> Geolocation is not supported </div>
        }
    }

    showPosition = (position) => {
        var latitude = position.coords.latitude,
            longitude = position.coords.longitude;

        Geocode.fromLatLng(latitude, longitude).then(
            response => {
                const address = response.results[0].formatted_address;
                this.props.form.setFieldsValue({
                    location: address,
                });
                this.props.onSelectField(address);
                var latLng = {
                    lat: latitude,
                    lng: longitude
                };
                this.setState({ latLng: latLng });
                this.getKrossBoxLocation(latLng);
            },
            error => {
                console.error(error);
            }
        );
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem>
                    {getFieldDecorator('location', {
                        initialValue: this.props.selectedLocation
                    })(
                        <LocationAutocomplete
                            placeholder={"Select Location"}
                            style={{ width: '100%', padding: '0px 20px 0px 45px', borderRadius: '3px', border: 'none' }}
                            locationType="(regions)"
                            googleAPIKey="AIzaSyA1V1tEY0c20Vp2HuJl0JsssFIZUOLnbO8"
                            onDropdownSelect={this.onDropdownSelect}
                        />
                        )}
                    <Icon type="environment" theme="filled" className="loctaion-icon" />
                    {!this.props.detectSection ?
                       <a className="detect-text" onClick={this.getLocation}><Button size="default" style={{ backgroundColor: "#fbfbfb", textAlign: 'center' }}><span style={{ float: 'right', paddingLeft: '10px', paddingTop: '3px' }}>Detect</span><i className="material-icons detect-icon">my_location</i></Button></a>
                       : <a className="search-detect-text" onClick={this.getLocation}><Button size="default" style={{ backgroundColor: "#fbfbfb", textAlign: 'center' }}><i className="material-icons search-detect-icon">my_location</i></Button></a>}
                </FormItem>
            </Form>
        );
    }
}
SearchSection = Form.create()(SearchSection);

export default connect(mapStateToProps, mapDispatchToProps)(SearchSection);