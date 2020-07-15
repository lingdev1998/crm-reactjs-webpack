import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Layout from '../../../Layout/index';
import PrivateRouter from '../PrivateRouter';
import Student from '../../../Student/index';
import Teacher from '../../../Teacher/index'

import { authenticationState } from '../../../../localState/authenticationState';
import { AUTH_TOKEN_KEY } from '../../../../config/constants';
import { useRecoilState } from 'recoil'

export const MainWrapper = (props) => {
  const [authentication, setAuthentication] = useRecoilState(authenticationState);
  useEffect(() => {
    if (localStorage.getItem(AUTH_TOKEN_KEY)) {
      setAuthentication({ ...authentication, authenticated: true })
    }
    else {
      setAuthentication({ ...authentication, authenticated: false })

    }


  }, [authentication.authenticated]);
  return (
    <div> 
    
        <Switch>
          <PrivateRouter path="/students" component={Student} />
          <PrivateRouter path="/teachers" component={Teacher} />

          <Redirect from="/" to="/students" />
        </Switch>
     </div>
  )
}
export default MainWrapper;

