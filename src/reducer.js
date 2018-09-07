import { combineReducers } from 'redux';
import auth from './reducers/auth';
import common from './reducers/common';
import search from './reducers/search';

export default combineReducers({
    auth,
    common,
    search
});
