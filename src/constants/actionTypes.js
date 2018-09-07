export const APP_LOAD = 'APP_LOAD';
export const REDIRECT = 'REDIRECT';
export const SET_PAGE = 'SET_PAGE';
export const HOME_PAGE_LOADED = 'HOME_PAGE_LOADED';
export const HOME_PAGE_UNLOADED = 'HOME_PAGE_UNLOADED';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const ASYNC_START = 'ASYNC_START';
export const ASYNC_END = 'ASYNC_END';
export const UPDATE_FIELD_AUTH = 'UPDATE_FIELD_AUTH';
export const REGISTER = 'REGISTER';
export const REGISTER_PAGE_UNLOADED = 'REGISTER_PAGE_UNLOADED';
export const SEARCH_PAGE_LOADED = 'SEARCH_PAGE_LOADED';
export const SEARCH_PAGE_UNLOADED = 'SEARCH_PAGE_LOADED';
export const UPDATE_FIELD = 'UPDATE_FIELD';
export const SELECTED_LOCATION = 'SELECTED_LOCATION';
export const GET_KROSSBOX_LOCATIONS = 'GET_KROSSBOX_LOCATIONS';
export const EMAIL_MASKING_REGEX = /^(.)(.*)(@.)(.*)(\.)(.*)$/;
export const SEARCH_SECTION_LOADED = 'SEARCH_SECTION_LOADED';
export const SEARCH_LOCATION = 'SEARCH_LOCATION';
export const GET_LOCATIONS = 'GET_LOCATIONS';
export const KROSSBOX_LOCATIONS = 'KROSSBOX_LOCATIONS';
export const SET_LAT_LONG = 'SET_LAT_LONG';

/*FUNCTION FOR MASKING EMAIL ID*/
export const MASK_EMAIL_ID = (emailId) => {
    return emailId.replace(EMAIL_MASKING_REGEX,
        (_, a, b, c, d, e, f) => a + b.replace(/./g, '*') + c + d.replace(/./g, '*') + e + f.replace(/./g, '*')
    );
};