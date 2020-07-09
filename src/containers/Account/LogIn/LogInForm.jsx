import React, { useState } from 'react';
import { Field, reduxForm, Form } from 'redux-form';
import { connect } from 'react-redux';
import EyeIcon from 'mdi-react/EyeIcon';
import KeyVariantIcon from 'mdi-react/KeyVariantIcon';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Alert, Button } from 'reactstrap';
import renderCheckBoxField from './CheckBox';

const  LogInForm = (props) =>  {
 

  const  defaultProps = {
    errorMessage: '',
    errorMsg: '',
    fieldUser: 'Tài khoản',
    typeFieldUser: 'text',
  }

  const [showPassword, setShowPassword] = useState(false);
  
  const handleSubmit = values =>{

    console.log(values)
    alert(values)
  }
 

 
    const {  errorMessage, errorMsg , form 
    } = props;
 
    return (
      <Form className="form login-form" onSubmit={props.handleSubmit}>
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
            <Field
              name="username"
              component="input"
              type={defaultProps.typeFieldUser}
              placeholder={defaultProps.fieldUser}
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Mật khẩu</span>
          <div className="form__form-group-field">
            <div className="form__form-group-icon">
              <KeyVariantIcon />
            </div>
            <Field
              name="password"
              component="input"
              type={showPassword ? 'text' : 'password'}
              placeholder="Mật khẩu"
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
            <Field
              name={`remember_me-${form}`}
              component={renderCheckBoxField}
              label="Remember me"
            />
          </div>
        </div>
        <div className="account__btns">
          <Button className="account__btn" submit="true" color="primary">Đăng nhập</Button>
          {/* <Link className="btn btn-outline-primary account__btn" to="/register">Create
            Account
          </Link> */}
        </div>
      </Form>
    );
 
}

// export default connect(state => ({
//   errorMsg: state.user.error,
// }))(reduxForm({form:"login"})(LogInForm));
export default  LogInForm;
