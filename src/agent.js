import superagentPromise from 'superagent-promise';
import _superagent from 'superagent'; //progressive client-side HTTP request library

const superagent = superagentPromise(_superagent, global.Promise);

//Comment the below line while publishing
const API_ROOT = 'http://localhost:61165/api';

//UnComment the below line while publishing
//const API_ROOT = 'http://202.83.25.123:8094/site/api';

//Google API
const GOOGLE_GEOCODE_API_ROOT = 'https://maps.googleapis.com/maps/api/geocode/json?sensor=true';
const GOOGLE_TIMEZONE_API_ROOT = 'https://maps.googleapis.com/maps/api/timezone/json?sensor=true';

const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {
    if (token) {
        req.set('authorization', `Token ${token}`);
    }
}

const requests = {
    del: url =>
        superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
    get: url =>
        superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
    put: (url, body) =>
        superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
    post: (url, body) =>
        superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
    getGeoCode: body =>
        superagent.get(`${GOOGLE_GEOCODE_API_ROOT}${body}`).then(responseBody),
    getTimeZone: body =>
        superagent.get(`${GOOGLE_TIMEZONE_API_ROOT}${body}`).then(responseBody)
};

const Auth = {
    current: () => {
        return requests.get(`/accountapi/getcurrentuser`);
    },
    registerOrUpdateUser: (registerViewModel) => {
        return requests.post(`/accountapi/createorupdateuserasync`, registerViewModel)
    },
    verifyEmail: (email) => {
        return requests.post(`/accountapi/verifyemail`, { email: email })
    }
}

export default {
    Auth,  
    setToken: _token => { token = _token; }
};