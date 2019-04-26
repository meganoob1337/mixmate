// This component is responsible for rendering the navbar

import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import auth0Client from '../../auth/Auth';
import logoutIcon from '../images/logout.png';
import inventoryIcon from '../images/lime-white.png';
import profileIcon from '../images/profile-white.png';
import exploreIcon from '../images/compass-white.png';
import './NavBar.css';

class NavBar extends Component {

    signOut = () => {
        auth0Client.signOut();
        this.props.history.replace('/');
    };

    render() {
        return (
            <React.Fragment>
                <nav className="navbar is-fixed-top">
                    <div className="navbar-brand navbar-custom">
                        <span>MIXMATE</span>
                        {auth0Client.isAuthenticated() &&
                            <img src={logoutIcon} className="logout-icon" alt="logout-icon" onClick={() => {this.signOut()}} />
                        }
                    </div>
                </nav>
                <nav className="navbar is-fixed-bottom">
                    <div className="navbar-brand navbar-bottom-custom">
                        <div className="navbar-item-custom">
                            <NavLink className="navbar-custom-link" activeClassName="selected" to="/inventory">
                                <img src={inventoryIcon} alt="inventory-icon" />
                            </NavLink>
                        </div>
                        <div className="navbar-item-custom">
                            <NavLink className="navbar-custom-link" activeClassName="selected" to="/profile">
                                <img src={profileIcon} alt="profile-icon" />
                            </NavLink>
                        </div>
                        <div className="navbar-item-custom">
                            <NavLink className="navbar-custom-link" activeClassName="selected" to="/explore">
                                <img src={exploreIcon} alt="explore-icon" />
                            </NavLink>
                        </div>
                    </div>
                </nav>
            </React.Fragment>
        )
    }
}

export default withRouter(NavBar)
