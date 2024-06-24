import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/routes.js';
import './assets/styles/index.css';

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <AppRoutes />
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);