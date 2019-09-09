import React, { Component } from 'react';
import loginImage from '../svg/login.svg';

import Client from '../utils/helper';

export default class login extends Component {
  state = {
    email: '',
    password: '',
    error: ''
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    const { handleFormSubmit } = this.props;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    try {
      if (!email || !password) return;

      if (!emailRegex.test(email)) {
        return this.setState({
          error: 'Invalid Email address'
        });
      }
      await Client.login({ email, password });
      //set app stated isLoggedIn to true
      handleFormSubmit();
    } catch (error) {
      console.log(error);
      if (error.status === 400) {
        this.setState({
          error: 'Bad Credentials'
        });
      }
      if (error.status === 401) {
        this.setState({
          error: 'Auth failed. Incorrect email or password'
        });
      }
    }
  };
  render() {
    const { email, password, error } = this.state;
    const invalid = !email || !password;
    return (
      <div className="signup">
        {error && (
          <span
            style={{ color: '#c70d3a', fontSize: '15', fontStyle: 'italic' }}
          >
            {error}
          </span>
        )}
        <div className="auth_image">
          <img src={loginImage} alt="" height="100" width="100" />
        </div>
        <form action="" onSubmit={this.handleSubmit}>
          <div className="form-control">
            <label htmlFor="">Email</label>
            <div className="form-input">
              <input
                name="email"
                type="text"
                value={email}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-control">
            <label htmlFor="">Password</label>
            <div className="form-input">
              <input
                name="password"
                type="password"
                value={password}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-control">
            <button type="submit" disabled={invalid}>
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }
}
