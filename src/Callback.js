import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import auth0Client from './auth/Auth';
import MixMateIcon from '../src/components/images/cocktail-shaker.png'

class Callback extends Component {
  async componentDidMount() {
    await auth0Client.handleAuthentication();
    this.props.history.replace('/profile');
  }

  render() {
    return (
      <div className="callback-content">
        <p>Loading profile...</p>
        <img src={MixMateIcon} alt="MixMate Icon" />
      </div>
    );
  }
}

export default withRouter(Callback);