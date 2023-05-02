import React, { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import styles from "./Signup.module.css"
import { useState } from 'react';
import axios from "axios";

function Signup() {
  const [user, setUser]= useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    household: ""
  })
  const onInputChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value})
  }
  const navigate = useNavigate();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
    await axios.post("/register", user)
    navigate("/")
    } catch(err) {
      let errorMessage = ''
      if (err.response.status >= 500) {
          errorMessage = 'Something is wrong with the server connection. Please try signing up again later.';
      } else if (err.response.status == 404) {
          errorMessage = "Household ID you are joining does not exist";
      } else if (err.response.status == 409) {
          errorMessage = err.response.data?.message;
      }

        alert("Problem signing up\n" + errorMessage);
    }
  };
  return (
    <div className={styles.login}>
      <div className={styles.loginForm}>
        <div className="title">Register New Account</div>
        <Form 
          user={user}
          handleSubmit={handleSubmit}
          onInputChange = {onInputChange}
        />
      </div>
      <label>Already have an account?</label>
      <Link to='/'>Click here to sign in</Link>
    </div>
  );
};
function Form({user, handleSubmit, onInputChange}) {
    const [newHousehold, setNewHousehold] = useState(true);
    const{username, password, firstName, lastName, household} = user;

    const handleChange = e => {
      setNewHousehold(current => !current)
    }
return (
  <div className = "form">
  <form onSubmit={handleSubmit}>
    <div className = "input-container">
      <label htmlFor='user'>Username</label>
      <input 
        id = 'user'
        type = "text"
        name = "username"
        value={username}
        onChange={(e) => onInputChange(e)}
        required
      />
    </div>
    <div className = "input-container">
      <label htmlFor='password'>Password</label>
      <input 
        id = 'password'
        type = "text"
        name = "password"
        value={password}
        onChange={(e) => onInputChange(e)}
        autoComplete="on"
        required
      />
      </div>
      <div className = "input-container">
      <label htmlFor='firstName'>First Name</label>
      <input 
        id = "firstName"
        type = "text"
        name = "firstName"
        value={firstName}
        onChange={(e) => onInputChange(e)}
        autoComplete="on"
        required
      />
    </div>
    <div className = "input-container">
      <label htmlFor='lastName'>Last Name</label>
      <input 
        id = 'lastName'
        type = "text"
        name = "lastName"
        value={lastName}
        onChange={(e) => onInputChange(e)}
        autoComplete="on"
        required
      />
    </div>
    <div className = "input-container">
      <label htmlFor='householdID'>Household ID</label>
      <input 
        id = 'householdID'
        type = "text"
        name = "household"
        value={household}
        onChange={(e) => onInputChange(e)}
        autoComplete="on"
        disabled = {!newHousehold}
        required = {newHousehold}
      />
    </div>
    <input type="checkbox"
    name = "newHousehold"
    value = {newHousehold}
     onChange={handleChange}
     disabled = {user.household} //disable check box if household ID field is filled in
     checked = {newHousehold.disabled}
     />Check box to create new household
    <br></br>
    <br></br>
    <div className= {styles.btnContainer}>
    <button className= {styles.btn} type='submit'>
      Register User
    </button>
    </div>
  </form>
</div>
)
};

export default Signup