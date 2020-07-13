import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useRecoilState } from 'recoil'
import { authenticationState } from '../../../localState/authenticationState';
import {SERVER_API_URL} from '../../../config/constants';
export const PrivateRoute = ({ component: Component, ...rest }) => {
    const [authentication, setAuthentication] = useRecoilState(authenticationState);
    useEffect(() => {
        if(localStorage.getItem(SERVER_API_URL)){
            setAuthentication({...authentication,authenticated:true})
        }
        else{
            setAuthentication({...authentication,authenticated:false});
            window.location.replace("localhost:3000/login")
        }

    }, []);

    return (
        <Route {...rest} render={props => (
             authentication.authenticated
                ? <Component {...props} />
                :""
                // <Redirect to={{ pathname: '/login'  }} />
        )} />
    )
}
export default PrivateRoute;