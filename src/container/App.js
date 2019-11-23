import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import './App.css';

import Navigation from "../component/Navigation";
import About from "../component/About";
import Home from "../component/Home";
import User from "../component/User";

function App() {
    return (
        <Router>
            <Navigation />


            <Switch>
                <Route path="/user/:username" children={<User />} />
                <Route path="/about">
                    <About />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
