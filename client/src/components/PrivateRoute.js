import React from 'react';
import {
    Route,
    Redirect
} from 'react-router-dom';

function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                localStorage.getItem('username') ? (
                    <Component {...props} />
                ) : (
                        <Redirect to={{
                            pathname: '/signin',
                            state: {from: props.location} }} />
                )
            }
        />
    )
}

export default PrivateRoute;

// code source: https://reacttraining.com/react-router/web/example/auth-workflow