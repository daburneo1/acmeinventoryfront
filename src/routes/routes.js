import React from 'react';
import {Route, Routes} from 'react-router-dom';
import LoginPage from '../pages/LoginPage.jsx';
import DashboardPage from '../pages/DashboardPage.jsx';
import Layout from '../layout.js';
import AuthContextProvider from "../contexts/AuthContext.js";

export default function AppRoutes() {
    return (
        <Layout>
            <AuthContextProvider>
                <Routes>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/dashboard" element={<DashboardPage/>}/>
                </Routes>
            </AuthContextProvider>
        </Layout>
    );
}