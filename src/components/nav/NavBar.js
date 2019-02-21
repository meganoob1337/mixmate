import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import auth0Client from '../../Auth';
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
                    </div>
                    {
                            auth0Client.isAuthenticated() &&
                            <div>
                            <label className="mr-2 text-white">{auth0Client.getProfile().name}</label>
                            <button className="btn btn-secondary" onClick={() => {this.signOut()}}>Sign Out</button>
                            </div>
                    }
                </nav>
                <nav className="navbar is-fixed-bottom">
                    <div className="navbar-brand">
                        <div className="navbar-item-custom">
                            <NavLink className="navbar-custom-link" activeClassName="selected" to="/inventory">Inventory</NavLink>
                        </div>
                        <div className="navbar-item-custom">
                            <NavLink className="navbar-custom-link" activeClassName="selected" to="/profile">Profile</NavLink>
                        </div>
                        <div className="navbar-item-custom">
                            <NavLink className="navbar-custom-link" activeClassName="selected" to="/explore">Explore</NavLink>
                        </div>
                    </div>
                </nav>
            </React.Fragment>
        )
    }
}

export default withRouter(NavBar)
