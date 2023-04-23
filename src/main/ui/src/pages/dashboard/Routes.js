import React from 'react'
import SharedDashboardLayout from './SharedLayout'
import { Route, Routes } from 'react-router-dom'
import Bills from './bills/Routes'
import Chores from './chores/ChoresHome'
import Home from './Home'

const Dashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedDashboardLayout/>}>
        <Route index element={<Home />} />
        <Route path="bills/*" element={<Bills />} />
        <Route path="chores" element={<Chores />} />
      </Route>
    </Routes>
  )
}

export default Dashboard