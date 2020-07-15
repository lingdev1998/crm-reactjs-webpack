import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import MainWrapper from '../MainWrapper';
import Landing from '../../Landing/index';
import NotFound404 from '../../DefaultPage/404/index';
import LockScreen from '../../Account/LockScreen/index';
import LogIn from '../../Account/LogIn/index';
import Register from '../../Account/Register/index';
import RegisterPhoto from '../../Account/RegisterPhoto/index';
import WrappedRoutes from './WrappedRoutes';

import {  useRecoilState } from 'recoil' 
import {authenticationState} from '../../../localState/authenticationState';

const Router = () => {
  const [authentication, setAuthentication] = useRecoilState(authenticationState);
  useEffect(()=>{
    console.log("authentication from router",authentication)
  },[authentication.authenticated])
  return (
    <MainWrapper>
      <main>
        <Switch>
          <Route exact path="/" component={Landing} />
 
          <Route path="/404" component={NotFound404} />
          <Route path="/lock_screen" component={LockScreen} />
          <Route path="/login" component={LogIn} />
          <Route path="/register" component={Register} />
          <Route path="/register_photo" component={RegisterPhoto} />
 
          <Route path="/" component={WrappedRoutes} />
        </Switch>
      </main>
    </MainWrapper>
  );
}


export default Router;
