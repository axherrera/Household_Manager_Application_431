import { React, useContext } from 'react'
import { LoginContext } from '../../contexts/LoginContext';

const Home = () => {
  const { user } = useContext(LoginContext);

  return (
    <div>Welcome, {user.firstName}!</div>
  )
}

export default Home