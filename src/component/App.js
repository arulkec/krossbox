import React, { Component } from 'react';
import { connect } from 'react-redux';
import { APP_LOAD, REDIRECT } from '../constants/actionTypes';
import { Route, Switch } from 'react-router-dom';
import Home from '../component/Home';
import Register from '../component/Register';
import UnderConstruction from '../component/shared/underconstruction';
import Header from '../component/Header';
import Search from '../component/Search';

import { store } from '../store';
import { push } from 'react-router-redux';

import 'bootstrap/dist/css/bootstrap.css';
import 'antd/dist/antd.css';
import '../scss/default.css';

const mapStateToProps = state => {
    return {
        appLoaded: state.common.appLoaded,
        appName: state.common.appName,
        redirectTo: state.common.redirectTo,
        currentUser: state.common.currentUser,
        currentUserRole: state.common.currentUserRole,
    }
};

const mapDispatchToProps = dispatch => ({
    onLoad: (payload, token) =>
        dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
    onRedirect: () =>
        dispatch({ type: REDIRECT })
});

class App extends Component {

    componentWillReceiveProps(nextProps) {
        if (nextProps.redirectTo) {
            store.dispatch(push(nextProps.redirectTo)); // Now you can dispatch navigation actions from anywhere!
            this.props.onRedirect();
        }
    }

    componentWillMount() {
       /* const token = window.localStorage.getItem('jwt');
        if (token) {
            agent.setToken(token); 
        }

        this.props.onLoad(token ? agent.Auth.current() : null, token);*/
    }

    render() {
        return (
            <div>
                <Header  />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/register" component={Register} />
                    <Route path="/underconstruction" component={UnderConstruction} />
                    <Route path="/location" component={Search} />
                </Switch>
            </div>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);

