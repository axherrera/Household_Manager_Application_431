import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import Signup from './pages/Signup';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/dashboard/Routes';
import { LoginContext } from './contexts/LoginContext';
import { mockBills } from './data';


const AppRoutes = () => {
    const [user, setUser] = useState(null)
    const [bills, setBills] = useState(mockBills);

    let contextValue = {
        user,
        setUser
    }

    if (process.env.REACT_APP_MOCK) {

        contextValue = {
            ...contextValue,
            bills,
            setBills
        };
    }

    const loggedIn = user != null
    const loggedOut = user == null

    return (
        <LoginContext.Provider value={contextValue}>
            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route element={<ProtectedRoute redirectCondition={loggedIn} redirectPath='/dashboard' />}>
                            <Route index element={<Login />} />
                            <Route path='signup' element={<Signup />}></Route>
                        </Route>

                        <Route path='dashboard/*' element={<ProtectedRoute redirectCondition={loggedOut} redirectPath='/' />}>
                            <Route path="*" element={<Dashboard />} />
                        </Route>
                    </Route>
                    {/* TODO: 404 page */}
                    <Route path="*" element={<div>404: Page Not Found</div>}></Route>
                </Routes>
            </BrowserRouter>
        </LoginContext.Provider>
    )
}

export default AppRoutes