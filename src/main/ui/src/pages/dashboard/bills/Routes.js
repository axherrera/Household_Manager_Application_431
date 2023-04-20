import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom/dist/umd/react-router-dom.development'
import Edit from './Edit'
import Home from './Home'
import SingleBill from './SingleBill'
import ProtectedSingleBillRoute from './ProtectedSingleBillRoute'
import './Bills.css'
import Add from './Add'

const BillsRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<div style={{ textAlign: 'center' }}><div className='bills-content'><Outlet /></div></div>}>
        <Route index element={<Home />} />
        <Route path=":billId" element={<ProtectedSingleBillRoute />}>
          <Route index element={<SingleBill />} />
          <Route path="edit" element={<Edit />} />
        </Route>
        <Route path="add" element={<Add />} />
      </Route>
    </Routes>
  )
}

export default BillsRoutes