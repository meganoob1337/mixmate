import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

export default class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-light light-blue flex-md-nowrap p-0 shadow">
                <ul className="nav nav-pills nav-fill">
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
        )
    }
}
