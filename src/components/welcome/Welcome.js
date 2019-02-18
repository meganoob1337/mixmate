import React, { Component } from 'react';
import auth0Client from '../../Auth';

export default class Welcome extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>Welcome</h1>
        {
          !auth0Client.isAuthenticated() &&
          <button className="btn btn-secondary" onClick={auth0Client.signIn}>Sign In</button>
        }
      </React.Fragment>
    );
  }
}