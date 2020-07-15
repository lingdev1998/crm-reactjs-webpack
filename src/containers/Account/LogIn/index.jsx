import React, { useEffect } from 'react';
import LogInForm from './LogInForm';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import { selector, useRecoilState } from 'recoil'
import { authenticationState } from '../../../localState/authenticationState';
import { AUTH_TOKEN_KEY } from '../../../config/constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const login = selector({
  key: 'login',
  get: async (formData) => {
    const rs = await axios.post("/authenticate", formData).then(res => res.data);
    return rs;
  }
});
 
const LogIn = (props) => {
 
  const [authentication, setAuthentication] = useRecoilState(authenticationState);

  const notify = () => toast.error('🦄 Tên đăng nhập hoặc mật khẩu không đúng!', {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  useEffect(() => {
    if (localStorage.getItem(AUTH_TOKEN_KEY)) {
      setAuthentication({ ...authentication, authenticated: true })
    }
    else {
      setAuthentication({ ...authentication, authenticated: false })

    }
    handleRedirect();
    console.log("authe from login", authentication);

  }, [authentication.authenticated])

  const handleRedirect = () => {
    if (authentication.authenticated === true) {
      props.history.push('/students');
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
      setAuthentication({ ...authentication, authenticated: true })
    }).catch(err => {
      notify();
    });
  }
  console.log("authentication", authentication.authenticated);
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
