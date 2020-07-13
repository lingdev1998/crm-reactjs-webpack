import React, { useEffect, useState } from 'react';
import LogInForm from './LogInForm';
import axios from 'axios';

import { selector,useRecoilState } from 'recoil'
import { authenticationState} from '../../../localState/authenticationState';
import {AUTH_TOKEN_KEY} from '../../../config/constants';
const login = selector({
  key: 'login',
  get: async (formData) => {
    const rs = await axios.post("/authenticate", formData).then(res => res.data);
    return rs;
  }
});
const LogIn = (props) => {

  const [errorMessage, setErrorMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [authentication, setAuthentication] = useRecoilState(authenticationState);

  useEffect(() => {
    handleRedirect();
  }, [authentication.authenticated])
  const handleRedirect = () => {
    if (authentication.authenticated) {
      props.history.push('/students');
    } else {
      // if (state.errorMessage) {
      //   setEnableToast(false);
      //   setToastError(state.errorMessage);
      //   setTimeout(() => {
      //     setEnableToast(true);
      //   }, 2000);
      // }
    }
  }
  const submit = values => {
    console.log(values);
    let data = new FormData();
    data.append('username', values.username);
    data.append('password', values.password);
    console.log(values);
    axios.post("/authenticate", data).then(res => {
      const jwt = res.data.jwttoken;
      localStorage.setItem(AUTH_TOKEN_KEY, jwt);
      console.log("login oke");
      setAuthentication({...authentication,authenticated : true})
    }).catch(err=>console.log(err));
  }

  return (
    <div className="account account--not-photo">
      <div className="account__wrapper">
        <div className="account__card">
          <div className="account__head">
            <h3 className="account__title">Chào mừng đến với cổng thông tin trường đại học
          <span className="account__logo-accent">  Phương Đông</span>
            </h3>
          </div>
          <LogInForm
            onSubmit={submit}
          />
        </div>
      </div>
    </div>
  );
};

export default LogIn;
