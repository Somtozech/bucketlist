import React, { Component } from 'react';
import signupImage from '../svg/signup.svg';

export default class signup extends Component {
  render() {
    return (
      <div className="signup">
        <div className="auth_image">
          <img src={signupImage} alt="" height="100" width="100" />
        </div>
        <form action="">
          <div className="form-control">
            <label htmlFor="">Email</label>
            <div className="form-input">
              <input type="text" />
            </div>
          </div>
          <div className="form-control">
            <label htmlFor="">Password</label>
            <div className="form-input">
              <input type="password" />
            </div>
          </div>
          <div className="form-control">
            <button type="submit">Create Account</button>
          </div>
        </form>
      </div>
    );
  }
}
