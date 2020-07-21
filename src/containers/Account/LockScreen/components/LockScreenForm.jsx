import React, { useState } from 'react';
import EyeIcon from 'mdi-react/EyeIcon';
import KeyVariantIcon from 'mdi-react/KeyVariantIcon';
import { Link } from 'react-router-dom';
import {Input} from 'reactstrap';
const AccountForm = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const { handleSubmit } = props;

  return (
    <form className="form" onSubmit={handleSubmit}>
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
          />
          <button
            className={`form__form-group-button${showPassword ? ' active' : ''}`}
            type="button"
            onClick={() => setShowPassword( e => !e)}
          ><EyeIcon />
          </button>
        </div>
        <div className="account__forgot-password">
          <a href="/">Forgot a password?</a>
        </div>
      </div>
      <Link className="btn btn-primary account__btn" to="/dashboard_default">Unlock</Link>
      <Link className="btn btn-outline-danger account__btn" to="/dashboard_default">Logout</Link>
    </form>
  );
}

export default AccountForm;
