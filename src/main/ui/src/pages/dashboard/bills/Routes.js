import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom/dist/umd/react-router-dom.development'
import Edit from './Edit'
import Home from './Home'
import SingleBill from './SingleBill'

const BillsRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<Outlet />}>
        <Route index element={<Home />} />
        <Route path=":billId" element={<Outlet />}>
          <Route index element={<SingleBill />} />
          <Route path="edit" element={<Edit />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default BillsRoutes