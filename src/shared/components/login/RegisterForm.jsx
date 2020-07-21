import React, { useState } from 'react';
import EyeIcon from 'mdi-react/EyeIcon';
import KeyVariantIcon from 'mdi-react/KeyVariantIcon';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';
import MailRuIcon from 'mdi-react/MailRuIcon';
import { Button, Alert } from 'reactstrap';
import { Input } from "reactstrap";

const RegisterForm = (props) => {

  const [showPassword, setShowPassword] = useState(false);
  this.showPassword = this.showPassword.bind(this);

  const { handleSubmit, errorMessage } = props;

  return (
    <form className="form" onSubmit={handleSubmit}>
      <Alert
        color="danger"
        isOpen={!!errorMessage}
      >
        {errorMessage}
      </Alert>
      <div className="form__form-group">
        <span className="form__form-group-label">Username</span>
        <div className="form__form-group-field">
          <div className="form__form-group-icon">
            <AccountOutlineIcon />
          </div>
          <Input
            name="username"
            component="input"
            type="text"
            placeholder="Name"
          />
        </div>
      </div>
      <div className="form__form-group">
        <span className="form__form-group-label">E-mail</span>
        <div className="form__form-group-field">
          <div className="form__form-group-icon">
            <MailRuIcon />
          </div>
          <Input
            name="email"
            component="input"
            type="email"
            placeholder="example@mail.com"
            required
          />
        </div>
      </div>
      <div className="form__form-group form__form-group--forgot">
        <span className="form__form-group-label">Password</span>
        <div className="form__form-group-field">
          <div className="form__form-group-icon">
            <KeyVariantIcon />
          </div>
          <Input
            name="password"
            component="input"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            required
          />
          <button
            type="button"
            className={`form__form-group-button${showPassword ? ' active' : ''}`}
            onClick={() => setShowPassword(values => !values)}
          ><EyeIcon />
          </button>
        </div>
      </div>
      <div className="account__btns register__btns">
        <Button type="submit" color="primary" className="account__btn">
          Sign Up
          </Button>
      </div>
    </form>
  );
}

export default RegisterForm;
