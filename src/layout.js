import React from 'react';
import './assets/styles/index.css';

export default function Layout({ children }) {
    return (
        <div className="inter">
            {children}
        </div>
    );
}