import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom/dist/umd/react-router-dom.development'
import Home from './Home'
import SingleBill from './SingleBill'

const BillsRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Outlet />}>
        <Route index element={<Home />} />
        <Route path=":billId" element={<SingleBill />} />
      </Route>
    </Routes>
  )
}

export default BillsRoutes