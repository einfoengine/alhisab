import React from 'react';

const Login = () => {
  return (
    <div className="nt-flex-center nt-fullscreen bg-gray-100">
      <div className="nt-card">
        <h2 className="nt-heading nt-text-center">Login</h2>
        <form className="nt-space-y">
          <div>
            <label htmlFor="email" className="nt-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="nt-input"
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
              className="nt-input"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="nt-primary-button"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
