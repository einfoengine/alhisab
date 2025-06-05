import React from 'react';

const Login = () => {
  return (
    <div className="nt-login-container">
      <div className="nt-login-card">
        <h2 className="nt-login-heading">Login</h2>
        <form className="nt-login-form">
          <div>
            <label htmlFor="email" className="nt-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="nt-login-input"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="password" className="nt-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="nt-login-input"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="nt-login-button"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
