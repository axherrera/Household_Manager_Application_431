import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import Signup from './pages/Signup';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/dashboard/Routes';


const AppRoutes = () => {
    const [user, setUser] = useState(null)

    const loggedIn = user !== null
    const loggedOut = user === null

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route element={<ProtectedRoute redirectCondition={loggedIn} redirectPath='/dashboard' />}>
                        <Route index element={<Login setUser={setUser}/>} />
                        <Route path='signup' element={<Signup user={user}/>}></Route>
                    </Route>

                    <Route path='dashboard/*' element={<ProtectedRoute redirectCondition={loggedOut} redirectPath='/'/>}>
                        <Route path="*" element={<Dashboard setUser={setUser}/>} />
                    </Route>
                </Route>
                <Route path="*" element={<div>nuh uh</div>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes