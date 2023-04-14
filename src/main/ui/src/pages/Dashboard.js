import React from 'react'
import Bills from './Bills'
import Chores from './Chores'
import { Route, Routes } from 'react-router-dom'
import SharedDashboardLayout from './SharedDashboardLayout'

const Dashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedDashboardLayout />}>
        <Route index element={<div>dashboard</div>} />
        <Route path="/bills" element={<Bills/>} />
        <Route path="/chores" element={<Chores />} />
      </Route>
    </Routes>
  )
}

export default Dashboard