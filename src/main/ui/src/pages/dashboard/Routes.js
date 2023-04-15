import React from 'react'
import SharedDashboardLayout from './SharedLayout'
import { Route, Routes } from 'react-router-dom/dist/umd/react-router-dom.development'
import Bills from './Bills'
import Chores from './Chores'
import Home from './Home'

const Dashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedDashboardLayout />}>
        <Route index element={<Home />} />
        <Route path="bills" element={<Bills/>} />
        <Route path="chores" element={<Chores />} />
      </Route>
    </Routes>
  )
}

export default Dashboard