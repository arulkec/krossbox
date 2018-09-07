import firebase from 'firebase';

var GeoFire = require("geofire");

var config = {
    apiKey: "AIzaSyBKINNO8cVGQtANLEynZtYdCjGyKXpFHPU",
    authDomain: "searchlocation-1eb3a.firebaseapp.com",
    databaseURL: "https://searchlocation-1eb3a.firebaseio.com",
    storageBucket: "searchlocation-1eb3a.appspot.com",
};

firebase.initializeApp(config);

// Get a reference to the database service
export const krossBoxLocationRef = firebase.database().ref('/box_details/kross_box_locations');
export const krossBoxDetailsRef = firebase.database().ref('/box_details/kross_box_details');

export const geoFire = new GeoFire(krossBoxLocationRef);