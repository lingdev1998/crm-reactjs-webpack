import React from 'react';
import { render } from 'react-dom';
import App from './containers/App/App';
//import App from'./temp';
import setupAxiosInterceptors from './config/axios-interceptor';

setupAxiosInterceptors(() => console.log('error'));
render(
  <App />,
  document.getElementById('root'),
);
