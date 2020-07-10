import React,{useEffect,useState} from 'react'; 
import LogInForm from './LogInForm';
import axios from 'axios';

import { selector } from 'recoil'


const login = selector({
  key: 'login',
  get: async (formData) => {
      const rs = await axios.post("/authenticate", formData).then(res => res.data);
      return rs;
  }
});
 const LogIn = (props) => {

  const [ errorMessage , setErrorMessage] = useState("");
  const [ errorMsg , setErrorMsg] = useState(""); 
  
  const submit = values => { 
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
