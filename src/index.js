import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import ApplicationViews from './components/ApplicationViews';
import 'bulma/css/bulma.css'
import './index.css';

ReactDOM.render(
    <Router>
        <ApplicationViews />
    </Router>,
    document.getElementById('root')
);
