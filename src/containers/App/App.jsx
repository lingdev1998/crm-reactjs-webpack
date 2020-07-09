import React, { useState, Fragment, useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import 'firebase/auth';
// eslint-disable-next-line import/no-extraneous-dependencies
import { hot } from 'react-hot-loader';
import 'bootstrap/dist/css/bootstrap.css';
import '../../scss/app.scss';
import Router from './Router';
import store from './store';
import ScrollToTop from './ScrollToTop';
import { config as i18nextConfig } from '../../translations';
import Loading from '../../shared/components/Loading';
i18next.init(i18nextConfig);

const App = () => {
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    window.addEventListener('load', () => {
      setLoading(false);
      setTimeout(() => setLoaded(true), 500);
    });
  }, []);


  return (
    <Provider store={store}>

      <BrowserRouter basename="/">
        <I18nextProvider i18n={i18next}>
          <ScrollToTop>
            <Fragment>
              {!loaded
                && (
                  <Loading loading={loading} />
                )
              }
              <div>
                <Router />
              </div>
            </Fragment>
          </ScrollToTop>
        </I18nextProvider>
      </BrowserRouter>
    </Provider>
  );
}


export default hot(module)(App);
