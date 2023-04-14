import React from 'react'
import { Navigate } from 'react-router-dom'

const Login = ({ user }) => {
  if (user) {
    return <Navigate to='/dashboard' />;
  }

  return (
    <div>Login</div>
  )
}

export default Login