import React from 'react';
import Tabs from './Tabs';
import Signup from './signup';
import Login from './login';

export default function auth({ handleLogin }) {
  return (
    <div className="auth">
      <div className="auth_form">
        <Tabs>
          <div label="Login">
            <Login handleFormSubmit={handleLogin}></Login>
          </div>
          <div label="Sign Up">
            <Signup handleFormSubmit={handleLogin}></Signup>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
