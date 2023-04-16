import {React, useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import "./Login.css"

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  // Function to get an approved user given a username and password.
  // Throws an error if the username and password is invalid
  const getUser = (username, password) => {

    // TODO: Hit /login endpoint
    // TODO: Handle Success and Error Codes

    return {name:'realUser'};
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) return;

    try {
      const user = getUser(username, password);

      setUser(user);
      
      navigate('/dashboard');
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="login">
      <div className="login-form">
        <div className="title">Sign In</div>
        <Form 
          username={username}
          setUsername={setUsername} 
          password={password}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
        />
      </div>
      <Link to='/signup'>signup</Link>
    </div>
  )
}

const Form = ({username, setUsername, password, setPassword, handleSubmit}) =>  {
  const [passwordType, setPasswordType] = useState('password');

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
              type = {passwordType}
              name = "pass"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="on"
              required
            />
          </div>
          <input type="checkbox" onClick={() => {setPasswordType(prev => prev === 'password' ? 'text' : 'password')}} />Show Password
          <br></br>
          <br></br>
          <button type='submit'>
            login
          </button>
        </form>
      </div>
  );
}

export default Login