import React from 'react'
import { useOutletContext } from 'react-router-dom'
import { BillHelpersList } from './Form';
import { useContext } from 'react';
import { LoginContext } from '../../../contexts/LoginContext';
import { getHouseholdMembers } from '../Utils';
import moment from 'moment';
import useBills from './useBills';
import ExpandCard from '../../../components/Card';
import { Button, Checkbox } from '@mui/material';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';

const SingleBill = () => {
    const { bill } = useOutletContext();
    const billId = bill.id;

    const { user } = useContext(LoginContext)
    const houseId = user.Household.id;
    const householdMembers = getHouseholdMembers(houseId);

    const navigate = useNavigate();
    
    const { editBill, deleteBill, payBill } = useBills();

    const date = moment(bill.date).format('dddd MMMM Do YYYY, h:mm a');

    const options = [
        {
            name: 'Edit',
            onClick: (billId) => { editBill(billId) }
        },
        {
            name: 'Delete',
            onClick: (billId) => { deleteBill(billId) }
        }
    ];

    const content = [
        {
            title: 'total',
            content: `${bill.total}`
        },
        {
            title: 'due',
            content: `${date}`
        },
        {
            title: 'Bill Helpers',
            content: <BillHelpersList billHelpers={bill.BillHelpers} householdMembers={householdMembers} />
        }
    ]

    if (bill.frequency !== 'single') {
        content.push(
            {
                title: 'recurring',
                content: bill.frequency
            }
        )
    }

    const actions = []
    
    const userBillHelper = bill.BillHelpers.find(helper => helper.id === user.id);

    if (userBillHelper !== undefined) {
        actions.push({
            title: 'Pay Bill',
            content: <Checkbox onChange={() => {payBill(bill.id, user.id)}} checked={userBillHelper.isPaid}></Checkbox>
        })
    }

    return (
        <>
            <ExpandCard 
                title={`${bill.name} Bill`}
                options={options}
                itemId={billId}
                mainContent={content}
                expandTitle={"notes:"}
                expandContent={bill.notes}
                bottomActions={actions}
            />
            <br></br>
            <br></br>
            <Button variant="contained" onClick={() => { navigate('/dashboard/bills') }}>Back to Bills</Button>
        </>
    )
}

export default SingleBill