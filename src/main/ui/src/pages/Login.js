import {React, useState} from 'react'
import { Navigate, Link } from 'react-router-dom'
import "./Login.css"

const Login = ({ user }) => {
  const renderForm = (
    <div className = "form">
      <form>
        <div className = "input-container">
          <label>Username</label>
          <input type = "text" name = "uname" required />
        </div>
        <div className = "input-container">
          <label>Password</label>
          <input type = "text" name = "pass" required />
        </div>
      </form>
    </div>
);
  return (
    <>
       <div className="login">
      <div className="login-form">
        <div className="title">Sign In</div>
        <div>{renderForm}</div>
      </div>
      <Link to='/signup'>signup</Link>
    </div>      
    </>
  )
}

export default Login