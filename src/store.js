import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger'; // logging that will replay problem as if they happened in our browser
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { promiseMiddleware, localStorageMiddleware } from './middleware';
import reducer from './reducer';

// A middleware you can apply to your Redux store to capture dispatched actions created by the action creators.
// It will redirect those actions to the provided history instance.
import { routerMiddleware } from 'react-router-redux';

// Create an enhanced history that syncs navigation events with the store
import createHistory from 'history/createBrowserHistory';

// Create a history of your choosing 
export const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const myRouterMiddleware = routerMiddleware(history);

const getMiddleware = () => {
    if (process.env.NODE_ENV === 'production') {
        return applyMiddleware(myRouterMiddleware, promiseMiddleware, localStorageMiddleware);
    } else {
        // Enable additional logging in non-production environments.
        return applyMiddleware(myRouterMiddleware, promiseMiddleware, localStorageMiddleware, createLogger())
    }
};

// Also apply our middleware for navigating
export const store = createStore(
    reducer, composeWithDevTools(getMiddleware()));