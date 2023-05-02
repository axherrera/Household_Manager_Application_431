import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = ({ 
    redirectCondition,
    children,
    redirectPath = '/',
}) => {
    if (redirectCondition) {
        return <Navigate to={redirectPath} replace />;
    }
    
    return children ? children : <Outlet />;
}

export default ProtectedRoute