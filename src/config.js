import firebase from 'firebase';

var GeoFire = require("geofire");

var config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    storageBucket: "",
};

firebase.initializeApp(config);

// Get a reference to the database service
export const krossBoxLocationRef = firebase.database().ref('/box_details/kross_box_locations');
export const krossBoxDetailsRef = firebase.database().ref('/box_details/kross_box_details');

export const geoFire = new GeoFire(krossBoxLocationRef);
