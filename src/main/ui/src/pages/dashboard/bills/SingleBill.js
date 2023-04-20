import React from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { Button as EditButton } from './Edit';
import { BillHelpersList } from './Form';
import { DeleteButton } from './Home';
import { useContext } from 'react';
import { LoginContext } from '../../../contexts/LoginContext';
import { getHouseholdMembers } from '../Utils';

const SingleBill = () => {
    const { bill } = useOutletContext();
    const billId = bill.id;

    const { user } = useContext(LoginContext)
    const houseId = user.Household.id;
    const householdMembers = getHouseholdMembers(houseId);

    return (
        <>
            <h3><b>{bill.name} Bill</b></h3>
            <h5><u>total:</u> {bill.total}</h5>
            <h5><u>frequency:</u> {bill.frequency}</h5>
            <h5><u>notes:</u></h5>
            <div style={{ fontSize: 12 }}>{bill.notes}</div>
            <h5><u>due date:</u> {bill.date.toString()}</h5>
            <h5><u>Bill Helpers:</u></h5>
            <BillHelpersList billHelpers={bill.BillHelpers} householdMembers={householdMembers} />
            <br></br>
            <EditButton billId={billId} />
            <DeleteButton billId={billId} />
            <br></br>
            <br></br>
            <Link to='/dashboard/bills'> back to all bills</Link>
        </>
    )
}

export default SingleBill