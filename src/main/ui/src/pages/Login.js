import React from 'react'
import { Navigate, Link } from 'react-router-dom'

const Login = ({ user }) => {
  return (
    <>
      <div>Login</div>
      <Link to='/signup'>signup</Link>
    </>
  )
}

export default Login