import React from 'react';
import { Route,Switch,Redirect } from 'react-router-dom';
import Layout from '../../../Layout/index'; 
import PrivateRouter from '../PrivateRouter'; 
import Student from '../../../Student/index'; 

export default () => (
  <div>
    <Layout />
    <div className="container__wrap"> 
      <Switch>
 
       <PrivateRouter path="/students" component={Student} /> 

      <Redirect from="/" to="/students" />
      </Switch>
    </div>
  </div>
);
