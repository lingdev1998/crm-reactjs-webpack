import React,{useEffect,useState} from 'react'; 
import LogInForm from './LogInForm';
import axios from 'axios';
import { connect ,useSelector, useDispatch} from 'react-redux';
import {userActions} from '../../../redux/actions/authActions';
 const LogIn = (props) => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.authReducer);

  const [ errorMessage , setErrorMessage] = useState("");
  const [ errorMsg , setErrorMsg] = useState(""); 
  
  const submit = values => {
    console.log(values);
    var formData = new FormData();
    formData.append("username",values.username);
    formData.append("password",values.password);
     userActions.login(formData) ;
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
