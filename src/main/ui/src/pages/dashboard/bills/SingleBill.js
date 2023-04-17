import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { mockBills } from '../../../data'

const SingleBill = () => {
    const { billId } = useParams()

    const bill = mockBills.find((bill) => bill.id === billId)

    return (
        <>
            <h3><b>{bill.name} Bill</b></h3>
            <h5><u>total:</u> {bill.total}</h5>
            <h5><u>frequency:</u> {bill.frequency}</h5>
            <h5><u>notes:</u></h5>
            <div style={{ fontSize: 12 }}>{bill.notes}</div>
            <h5><u>due date:</u> {bill.date.toString()}</h5>
            <br></br>
            <Link to='/dashboard/bills'> back to all bills</Link>
            <br></br>
            <Link to={`/dashboard/bills/${billId}/edit`}>Edit Bill</Link>
        </>
    )
}

export default SingleBill