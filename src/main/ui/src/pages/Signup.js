import React from 'react'
import { Navigate } from 'react-router-dom'

const Signup = ({user}) => {
  if (user) {
    return <Navigate to='/dashboard' />;
  }

  return (
    <div>Signup</div>
  )
}

export default Signup