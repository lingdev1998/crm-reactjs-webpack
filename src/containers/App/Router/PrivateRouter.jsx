import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Layout from '../../Layout/index';

import { selector, useRecoilState } from 'recoil'
import { AUTH_TOKEN_KEY } from '../../../config/constants';
import { authenticationState } from '../../../localState/authenticationState';
export const PrivateRoute = ({ component: Component, ...rest }) => {
    const [authentication, setAuthentication] = useRecoilState(authenticationState);
    useEffect(() => {
        if (localStorage.getItem(AUTH_TOKEN_KEY)) {
            setAuthentication({ ...authentication, authenticated: true })
        }
        else {
            setAuthentication({ ...authentication, authenticated: false })

        }
        console.log("authe from privste", authentication);

    }, [authentication.authenticated])
    return (
        <Route {...rest} render={props => (
            authentication.authenticated === true
                ? <><Layout /><div className="container__wrap"><Component {...props} /></div>  </>
                : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )} />
    )
}

export default PrivateRoute;