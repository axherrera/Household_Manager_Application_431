import React from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { BillHelpersList } from './Form';
import { useContext } from 'react';
import { LoginContext } from '../../../contexts/LoginContext';
import { getHouseholdMembers } from '../Utils';
import moment from 'moment';
import useBills from './useBills';

const SingleBill = () => {
    const { bill } = useOutletContext();
    const billId = bill.id;

    const { user } = useContext(LoginContext)
    const houseId = user.Household.id;
    const householdMembers = getHouseholdMembers(houseId);

    const { editBill, deleteBill, payBill } = useBills();

    return (
        <>
            <h3><b>{bill.name} Bill</b></h3>
            <h5><u>total:</u> {bill.total}</h5>
            <h5><u>frequency:</u> {bill.frequency}</h5>
            <h5><u>notes:</u></h5>
            <div style={{ fontSize: 12 }}>{bill.notes}</div>
            <h5><u>due date:</u> {moment(bill.date).format('dddd MMMM Do YYYY, h:mm:ss a')}</h5>
            <h5><u>Bill Helpers:</u></h5>
            <BillHelpersList billHelpers={bill.BillHelpers} householdMembers={householdMembers} />
            <br></br>
            {bill.BillHelpers.find(helper => helper.id === user.id) !== undefined && <button onClick={() => payBill(bill.id, user.id)}>pay</button>}
            <button onClick={() => { editBill(billId) }}>Edit Bill</button>
            <button onClick={() => { deleteBill(billId) }}>Delete Bill</button>
            <br></br>
            <br></br>
            <Link to='/dashboard/bills'> back to all bills</Link>
        </>
    )
}

export default SingleBill