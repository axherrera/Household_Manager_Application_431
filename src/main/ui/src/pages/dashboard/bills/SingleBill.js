import React from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { Button } from './Edit';

const SingleBill = () => {
    const { bill } = useOutletContext();
    const billId = bill.id;

    return (
        <>
            <h3><b>{bill.name} Bill</b></h3>
            <h5><u>total:</u> {bill.total}</h5>
            <h5><u>frequency:</u> {bill.frequency}</h5>
            <h5><u>notes:</u></h5>
            <div style={{ fontSize: 12 }}>{bill.notes}</div>
            <h5><u>due date:</u> {bill.date.toString()}</h5>
            <br></br>
            <Button billId={billId} />
            <br></br>
            <br></br>
            <Link to='/dashboard/bills'> back to all bills</Link>
        </>
    )
}

export default SingleBill