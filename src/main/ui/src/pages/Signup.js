import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import styles from "./Signup.module.css"
import { useState } from 'react';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const[householdID, setHouseholdID] = useState('');

  const navigate = useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/")
  };
  return (
    <div className={styles.login}>
      <div className={styles.loginForm}>
        <div className="title">Register New Account</div>
        <Form 
          username={username}
          setUsername={setUsername} 
          password={password}
          setPassword={setPassword}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          householdID = {householdID}
          setHouseholdID = {setHouseholdID}
          handleSubmit={handleSubmit}
        />
      </div>
      <label>Already have an account?</label>
      <Link to='/'>Click here to sign in</Link>
    </div>
  );
};
function Form({username, setUsername, password, setPassword, firstName, 
  setFirstName, lastName, setLastName, householdID, setHouseholdID, handleSubmit}) {
    const [newHousehold, setNewHousehold] = useState(true);
    const handleChange = e => {
      setNewHousehold(current => !current)
    }
return (
  <div className = "form">
  <form onSubmit={handleSubmit}>
    <div className = "input-container">
      <label>Username</label>
      <input 
        type = "text"
        name = "uname"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
    </div>
    <div className = "input-container">
      <label>Password</label>
      <input 
        type = "text"
        name = "pass"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="on"
        required
      />
      </div>
      <div className = "input-container">
      <label>First Name</label>
      <input 
        type = "text"
        name = "fName"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        autoComplete="on"
        required
      />
    </div>
    <div className = "input-container">
      <label>Last Name</label>
      <input 
        type = "text"
        name = "lName"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        autoComplete="on"
        required
      />
    </div>
    <div className = "input-container">
      <label>Household ID</label>
      <input 
        type = "text"
        name = "householdID"
        value={householdID}
        onChange={(e) => setHouseholdID(e.target.value)}
        autoComplete="on"
        disabled = {!newHousehold}
        required = {newHousehold}
      />
    </div>
    <input type="checkbox"
    name = "newHousehold"
    value = {newHousehold}
     onChange={handleChange}
     disabled = {householdID} //disable check box if household ID field is filled in
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