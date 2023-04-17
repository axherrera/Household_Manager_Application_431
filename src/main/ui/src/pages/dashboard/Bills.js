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
            <h5>{bill.name}: ${bill.total}</h5>
            <h5>due: {bill.date.toString()}</h5>
            <h6><Link to={`/dashboard/bills/${bill.id}`}>more info</Link></h6>
          </article>
        })}
      </div>
      <button>add bill</button>
    </>
  )
}

const SingleBill = () => {
  const {billId} = useParams()

  const bill = mockBills.find((bill) => bill.id === billId)

  return (
    <>
      <h3><b>{bill.name} Bill</b></h3>
      <h5>total: {bill.total}</h5>
      <h5>frequency: {bill.frequency}</h5>
      <h5>notes:</h5>
      <div style={{fontSize: 12}}>{bill.notes}</div>
      <h5>due date: {bill.date.toString()}</h5>
      <br></br>
      <Link to='/dashboard/bills'> back to all bills</Link>
    </>
  )
}

export default Bills