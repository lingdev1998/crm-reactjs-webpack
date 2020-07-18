import React, { useEffect } from 'react';
import LogInForm from './LogInForm';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import { selector, useRecoilState } from 'recoil'
import { authenticationState } from '../../../localState/authenticationState';
import { AUTH_TOKEN_KEY } from '../../../config/constants';
import { ToastContainer, toast } from 'react-toastify';
import {notifyError} from '../../../shared/components/Notifications';

const LogIn = (props) => {

  const [authentication, setAuthentication] = useRecoilState(authenticationState);

  useEffect(() => {
    if (localStorage.getItem(AUTH_TOKEN_KEY)) {
      setAuthentication({ ...authentication, authenticated: true })
    }
    else {
      setAuthentication({ ...authentication, authenticated: false })

    }
    handleRedirect();

  }, [authentication.authenticated])

  const handleRedirect = () => {
    if (authentication.authenticated === true) {
      props.history.push('/students');
    }
  }
  const submit = values => {
    let data = new FormData();
    data.append('username', values.username);
    data.append('password', values.password);
    axios.post("/authenticate", data).then(res => {
      const jwt = res.data.jwttoken;
      localStorage.setItem(AUTH_TOKEN_KEY, jwt);
      setAuthentication({ ...authentication, authenticated: true })
    }).catch(err => {
      notifyError("Tên đăng nhập hoặc mật khẩu không đúng!");
    });
  }
  return (
    <>
      {
        authentication.authenticated === false ?
          <div className="account account--not-photo">
            <div className="account__wrapper">
              <div className="account__card">
                <div className="account__head">
                  <h3 className="account__title">Chào mừng đến với cổng thông tin trường đại học
          <span className="account__logo-accent">  Phương Đông</span>
                  </h3>
                </div>
                <ToastContainer />
                <LogInForm
                  onSubmit={submit}
                />
              </div>
            </div>
          </div> : <Redirect path="/students" />
      }
    </>
  );
};

export default LogIn;
