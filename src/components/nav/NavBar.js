import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import auth0Client from '../../Auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css';

class NavBar extends Component {

    signOut = () => {
        auth0Client.signOut();
        this.props.history.replace('/');
    };

    render() {
        return (
            <React.Fragment>
                <nav className="navbar fixed-top navbar-light bg-light navbar-custom">
                    <span className="navbar-brand mb-0 h1 mx-auto">MixMate</span>
                    {
                            auth0Client.isAuthenticated() &&
                            <div>
                            <label className="mr-2 text-white">{auth0Client.getProfile().name}</label>
                            <button className="btn btn-secondary" onClick={() => {this.signOut()}}>Sign Out</button>
                            </div>
                    }
                </nav>
                <nav className="navbar fixed-bottom navbar-light bg-light navbar-custom">
                    <ul className="nav nav-pills nav-fill mx-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/inventory">Inventory</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Profile</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/explore">Explore</Link>
                        </li>
                    </ul>
                </nav>
            </React.Fragment>
        )
    }
}

export default withRouter(NavBar)
