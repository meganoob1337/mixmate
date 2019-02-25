import React, { Component } from 'react';
import auth0Client from '../../auth/Auth';
import './Welcome.css';

export default class Welcome extends Component {
  render() {
    localStorage.removeItem("userId");
    return (
      <div className="welcome-container">
        <p className="welcome-header">Welcome to MixMate</p>
        {
          !auth0Client.isAuthenticated() &&
          <button className="login-button" onClick={auth0Client.signIn}>Log In With Auth0</button>
        }
      </div>
    );
  }
}