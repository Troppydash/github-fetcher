import React from 'react';
import {Link, withRouter} from "react-router-dom";


function Navigation(props) {
    const path = props.location.pathname;
    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <Link className="navbar-brand" to="/">Github Fetcher</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className={`nav-item ${path === "/" ? 'active' : ''}`}>
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className={`nav-item ${path === "/about" ? 'active' : ''}`}>
                        <Link className="nav-link" to="/about">About</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default withRouter(Navigation);