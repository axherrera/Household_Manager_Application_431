import React from 'react'
import { Navigate, Link } from 'react-router-dom'

const Signup = ({user}) => {
  if (user) {
    return <Navigate to='/dashboard' />;
  }

  return (
    <>
      <div>Signup</div>
      <Link to='/login'>submit</Link>
    </>
  )
}

export default Signup