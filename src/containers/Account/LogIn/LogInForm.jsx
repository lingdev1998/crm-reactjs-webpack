import React, { useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import EyeIcon from 'mdi-react/EyeIcon';
import KeyVariantIcon from 'mdi-react/KeyVariantIcon';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';
import { Alert, Button, Form,Input } from 'reactstrap';
import renderCheckBoxField from './CheckBox';

let LogInForm = (props) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const defaultProps = { 
    fieldUser: 'Tài khoản',
    typeFieldUser: 'text',
  }

  const [showPassword, setShowPassword] = useState(false);




  const { errorMessage, errorMsg 
  } = props;

  return (
    <form className="form login-form"  >
      <Alert
        color="danger"
        isOpen={!!errorMessage || !!errorMsg}
      >
        {errorMessage}
        {errorMsg}
      </Alert>
      <div className="form__form-group">
        <span className="form__form-group-label">{defaultProps.fieldUser}</span>
        <div className="form__form-group-field">
          <div className="form__form-group-icon">
            <AccountOutlineIcon />
          </div>
          <Input
            type="text"
            placeholder="Tài khoản"
            autoComplete="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      </div>
      <div className="form__form-group">
        <span className="form__form-group-label">Mật khẩu</span>
        <div className="form__form-group-field">
          <div className="form__form-group-icon">
            <KeyVariantIcon />
          </div>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Mật khẩu"
            autoComplete="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className={`form__form-group-button${showPassword ? ' active' : ''}`}
            onClick={e => setShowPassword(!showPassword)}
          ><EyeIcon />
          </button>
          <div className="account__forgot-password">
            <a href="/">Quên mật khẩu?</a>
          </div>
        </div>
      </div>
      <div className="form__form-group">
        <div className="form__form-group form__form-group-field">
         
        </div>
      </div>
      <div className="account__btns">
        <Button className="account__btn" type="button" color="primary" onClick={() => props.onSubmit({username,password})} >Đăng nhập</Button>
        {/* <Link className="btn btn-outline-primary account__btn" to="/register">Create
            Account
          </Link> */}
      </div>
    </form>
  );

}

export default LogInForm;