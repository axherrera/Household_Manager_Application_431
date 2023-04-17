import React from 'react'
import { Outlet, Route, Routes, Link, useParams } from 'react-router-dom/dist/umd/react-router-dom.development'
import { mockBills } from '../../data'

const Bills = () => {
  return (
    <Routes>
      <Route path="" element={<Outlet />}>
        <Route index element={<Home/>} />
        <Route path=":billId" element={<SingleBill />} />
      </Route>
    </Routes>
  )
}

const Home = () => {
  return (
    <>
      <h2>Bills</h2>
      <div>
        {mockBills.map((bill)=> {
          return <article key={bill.id}>
            <h5>{bill.name}</h5>
            <h6><Link to={`/dashboard/bills/${bill.id}`}>more info</Link></h6>
          </article>
        })}
      </div>
    </>
  )
}

const SingleBill = () => {
  const {billId} = useParams()

  const bill = mockBills.find((bill) => bill.id === billId)

  return (
    <>
      <h4>{bill.name}</h4>
      <Link to='/dashboard/bills'> back to all bills</Link>
    </>
  )
}

export default Bills