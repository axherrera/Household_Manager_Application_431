import React from 'react'
import { Navigate, Link } from 'react-router-dom'

const Login = ({ user }) => {
  if (user) {
    return <Navigate to='/dashboard' />;
  }

  return (
    <>
      <div>Login</div>
      <Link to='/signup'>signup</Link>
    </>
  )
}

export default Login