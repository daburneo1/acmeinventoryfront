import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import AuthContextProvider from './contexts/AuthContext.js';

function App() {
    return (
        <AuthContextProvider>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
            </Routes>
        </AuthContextProvider>
    );
}

export default App;