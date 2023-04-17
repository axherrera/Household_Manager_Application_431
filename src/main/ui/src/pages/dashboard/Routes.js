import React, { useContext } from 'react'
import SharedDashboardLayout from './SharedLayout'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Bills from './bills/Routes'
import Chores from './Chores'
import Home from './Home'
import { LoginContext } from '../../contexts/LoginContext'

const Dashboard = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(LoginContext);

  const logOut = () => {
    setUser(null)
    navigate('/')
  }

  return (
    <Routes>
      <Route path="/" element={<SharedDashboardLayout logOutFn={logOut} />}>
        <Route index element={<Home user={user} />} />
        <Route path="bills/*" element={<Bills />} />
        <Route path="chores" element={<Chores />} />
      </Route>
    </Routes>
  )
}

export default Dashboard