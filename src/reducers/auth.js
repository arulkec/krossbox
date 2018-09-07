import {
    ASYNC_START,
    ASYNC_END,
    LOGIN,
    REGISTER,
    REGISTER_PAGE_UNLOADED,
    UPDATE_FIELD_AUTH,
    MASK_EMAIL_ID,
    HOME_PAGE_LOADED,
    HOME_PAGE_UNLOADED,    
    SEARCH_LOCATION,
    GET_LOCATIONS
} from '../constants/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case ASYNC_START:
            if (action.subtype === LOGIN) {
                return {
                    ...state, inProgress: true,
                    isLoginLoaderVisible: true
                };
            }
            else if (REGISTER) {
                return {
                    ...state, inProgress: true,
                    isRegisterLoaderVisible: true
                };
            }
            break;
        case ASYNC_END:
            return {
                ...state,
                isLoginLoaderVisible: false,
                isRegisterLoaderVisible: false
            };
        case REGISTER:
            return {
                ...state,
                inProgress: false,
                errors: action.error ? action.payload.errors : null,
                maskedEmailId: state.email ? MASK_EMAIL_ID(state.email) : ""
            };
        case UPDATE_FIELD_AUTH: 
            return {
                ...state,
                [action.key]: action.value
            };
        case GET_LOCATIONS:
            return {
                ...state,
                isHomePage: false,
                availableKrossBoxLocation: action.payload != null && action.payload ? action.payload : null
            };       
        case HOME_PAGE_LOADED:
            return {
                ...state
            };
        case SEARCH_LOCATION:
            return {
                ...state,
                selectedLocation: action.value
            };
        case HOME_PAGE_UNLOADED:
        case REGISTER_PAGE_UNLOADED:
            return {};
        default:
            return state;
    }

    return state;
};