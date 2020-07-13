import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Layout from '../../../Layout/index';
import PrivateRouter from '../PrivateRouter';
import Student from '../../../Student/index';
import { authenticationState } from '../../../../localState/authenticationState';
import { AUTH_TOKEN_KEY } from '../../../../config/constants';
import { useRecoilState } from 'recoil'
export const MainWrapper = (props) => {
  const [authentication, setAuthentication] = useRecoilState(authenticationState);
  useEffect(() => {
    if (localStorage.getItem(AUTH_TOKEN_KEY)) {
      setAuthentication({ ...authentication, authenticated: true })
    }


  }, [authentication.authenticated]);
  return (
    <div>
      {
        authentication.authenticated === true ? 
        <>
          <Layout />
          <div className="container__wrap">
            <Switch>
              <Route path="/students" component={Student} />

              <Redirect from="/" to="/students" />
            </Switch>
          </div>
        </> : <Redirect   to="/login" />
      }
    </div>
  )
}
export default MainWrapper;

