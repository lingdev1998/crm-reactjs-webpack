import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('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')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)
export default PrivateRoute;