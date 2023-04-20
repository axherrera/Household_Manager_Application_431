import React, { useContext } from 'react'
import { Link, useOutletContext, useParams } from 'react-router-dom'
import { Outlet } from 'react-router-dom/dist/umd/react-router-dom.development'
import { LoginContext } from '../../../contexts/LoginContext'

const GetMockBill = (id, householdId) => {
    const { bills } = useContext(LoginContext);

    return bills.find((bill) => bill.id === id && bill.houseId === householdId);
}

const getBill = (id, householdId) => {
    if (process.env.REACT_APP_MOCK) {
        return GetMockBill(id, householdId)
    }

    return null;
}

export const ProtectedSingleBillRoute = () => {
    const { billId } = useParams()
    const { user } = useContext(LoginContext)
    const houseId = user.Household.id;

    // TODO: routing a bill id URL that doesn’t exist back to the bills page

    const bill = getBill(billId, houseId);

    return (
        <>
            <Outlet context={{ bill }} />
        </>
    )
}

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
            <Link to={`/dashboard/bills/${billId}/edit`}>Edit Bill</Link>
            <br></br>
            <br></br>
            <Link to='/dashboard/bills'> back to all bills</Link>
        </>
    )
}

export default SingleBill