import {
    APP_LOAD,
    REDIRECT,
    LOGOUT,
    REGISTER,
    GET_LOCATIONS,
    SEARCH_SECTION_LOADED
} from '../constants/actionTypes';

const defaultState = {
    appName: 'NEW_APPLICATION',
    token: null,
    viewChangeCounter: 0
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case APP_LOAD:
            return {
                ...state,
                token: !action.error ? action.token : null,
                redirectTo: action.error ? '/' : null
            };
        case REDIRECT:
            return { ...state, redirectTo: null };
        case LOGOUT:
            return { ...state, redirectTo: '/', token: null, currentUser: null, currentUserRole: null };
        case REGISTER:
            return {
                ...state,
                redirectTo: (action.payload && action.payload.success) ? '/underconstruction' : null
            };
        case GET_LOCATIONS:
            return {
                ...state,
                redirectTo: (action.payload !== null) ? '/location' : null 
            }
        case SEARCH_SECTION_LOADED:
        return {
            ...state,
            isHomePage: action.value
        }
        default:
            return state;
    }
};
