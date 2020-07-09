import React,{useEffect} from 'react';
import LogInForm from './LogInForm';
 const LogIn = (props) => {
  const handleSubmit = (params) => {
    console.log(params)
    alert(params);
    console.log(params)
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
          
          form="log_in_form"
          handleSubmit={handleSubmit}
        /> 
      </div>
    </div>
    </div>
  );
};

export default LogIn;
