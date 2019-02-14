import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css';

export default class NavBar extends Component {
    render() {
        return (
            <React.Fragment>
                <nav className="navbar fixed-top navbar-light bg-light navbar-custom">
                    <span className="navbar-brand mb-0 h1 mx-auto">MixMate</span>
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
