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
                localStorage.getItem("Email")
                    ? (<Component {...props} />)
                    : (alert("You must log in"),
                        <Redirect to={{
                            pathname: "/usersignin",
                            state: { from: props.location }
                        }} />
                    )
            }
        />
    );
}

export default PrivateRoute;

// code source: https://reacttraining.com/react-router/web/example/auth-workflow