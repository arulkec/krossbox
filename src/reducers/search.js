import {
    SEARCH_PAGE_LOADED,
    SEARCH_PAGE_UNLOADED,
    UPDATE_FIELD,
    SELECTED_LOCATION,
    GET_KROSSBOX_LOCATIONS,
    KROSSBOX_LOCATIONS,
    SET_LAT_LONG
} from '../constants/actionTypes';

export default (state={}, action) => {
    switch (action.type) {  
        case SEARCH_PAGE_LOADED: 
            return { 
                ...state,
                location: '',
                locationDetail: false,
                updateViewDetail: false,
                detectSection: true
             };
        case SELECTED_LOCATION:
             return { 
                 ...state,
                 selectedLocation: action.value
              };
        case GET_KROSSBOX_LOCATIONS:
              return { 
                  ...state,
                  availableKrossBoxLocation: action.payload != null && action.payload ? action.payload: null
            };
        case KROSSBOX_LOCATIONS: 
            return {
                ...state,
                krossboxLocation: action.value
            }
        case UPDATE_FIELD: 
            return {
                ...state,
                locationDetail: action.value
            };
        case SET_LAT_LONG: 
            return {
                ...state,
                latitude: action.value.lat,
                longitude: action.value.lng
            };
        case SEARCH_PAGE_UNLOADED:
            return {};
        default:
            return state;
    }
};
