import React, { Component } from 'react';
import auth0Client from '../../auth/Auth';
import BarVideo from './BarVideo.mp4';
import './Welcome.css';

export default class Welcome extends Component {
  render() {
    localStorage.removeItem("userId");

    return (
      <React.Fragment>
        <video autoPlay muted loop id="myVideo">
          <source src={BarVideo} type="video/mp4" />
        </video>
        <div className="welcome-container">
          <p className="welcome-header">Welcome to MIXMATE</p>
          {
            !auth0Client.isAuthenticated() &&
            <button className="login-button" onClick={auth0Client.signIn}>Log In With Auth0</button>
          }
        </div>
      </React.Fragment>
    );
  }
}