import agent from './agent';
import {
    ASYNC_START,
    ASYNC_END,
    LOGIN,
    LOGOUT,
    REGISTER
} from './constants/actionTypes';
import { notification } from 'antd';

const openNotificationWithIcon = (type, msgTitle, msgContent) => {
    notification[type]({
        className: 'notify-' + type,
        message: msgTitle,
        description: msgContent,
        duration: 3
    });
};


const promiseMiddleware = store => next => action => {
    if (isPromise(action.payload)) {
        store.dispatch({ type: ASYNC_START, subtype: action.type });

        const currentView = store.getState().viewChangeCounter;
        const skipTracking = action.skipTracking;

        action.payload.then(
            res => {
                const currentState = store.getState()
                if (!skipTracking && currentState.viewChangeCounter !== currentView) {
                    return
                }

                console.log('Result', res);
                action.payload = res;
                if (action.payload) {
                    if (action.payload && action.payload.message) {
                        openNotificationWithIcon("success", "Success", action.payload.message + 'Now you can login with your new Password. ');
                    }
                    else if (action.payload.message) {
                        if (action.payload.success)
                            openNotificationWithIcon("success", "Success", action.payload.message);
                        else
                            openNotificationWithIcon("info", "Info", action.payload.message);
                    }
                }
                store.dispatch({ type: ASYNC_END, promise: action.payload, subtype: action.type });
                store.dispatch(action);
            },
            error => {
                const currentState = store.getState()
                if (!skipTracking && currentState.viewChangeCounter !== currentView) {
                    return
                }
                console.log('ERROR', error);
                action.error = true;
                action.payload = error.message;
                openNotificationWithIcon("error", "Error", action.payload);
                if (!action.skipTracking) {
                    store.dispatch({ type: ASYNC_END, promise: action.payload, subtype: action.type });
                }
                store.dispatch(action);
            }
        );
        return;
    } 
    next(action);
};

const localStorageMiddleware = store => next => action => {
    if (action.type === REGISTER || action.type === LOGIN) {
        if (!action.error && action.payload) {
            window.localStorage.setItem('jwt', action.payload.jwtToken);
            agent.setToken(action.payload.jwtToken);
        }
    } else if (action.type === LOGOUT) {
        window.localStorage.setItem('jwt', '');
        agent.setToken(null);
    }

    next(action);
};

function isPromise(v) {
    return v && typeof v.then === 'function';
}


export { promiseMiddleware, localStorageMiddleware }