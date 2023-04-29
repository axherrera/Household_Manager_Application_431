import React from 'react'
import { useOutletContext } from 'react-router-dom'
import { BillHelpersList } from './Form';
import { useContext } from 'react';
import { LoginContext } from '../../../contexts/LoginContext';
import moment from 'moment';
import useBills from './useBills';
import ExpandCard from '../../../components/Card';
import { Button, Checkbox, CircularProgress, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import useHousehold from '../useHousehold';
import RefreshIcon from '@mui/icons-material/Refresh';

const SingleBill = () => {
    const { bill, setBill, setLoading } = useOutletContext();
    const billId = bill.id;

    const { user } = useContext(LoginContext)
    const { householdMembers } = useHousehold();

    const navigate = useNavigate();
    
    const { navigateToEditBill, deleteBill, payBill } = useBills();

    const date = moment(bill.date).format('dddd MMMM Do, YYYY');

    const options = [
        {
            name: <>
                    <Typography variant="button" fontSize={"small"}>
                        refresh
                    </Typography>
                    <RefreshIcon fontSize="small"/>
            </>,
            onClick: (billId) => { setLoading(true) }
        },
        {
            name: 'Edit',
            onClick: (billId) => { setLoading(true); navigateToEditBill(billId); }
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
            content: householdMembers.length === 0 ? <CircularProgress /> : <BillHelpersList billHelpers={bill.BillHelpers} householdMembers={householdMembers} />
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
            content: <Checkbox onChange={
                async () => {
                    const newlyPaidBill = toggleHelperPayment(bill, user.id);
                    await payBill(newlyPaidBill, user.id);
                    setBill(newlyPaidBill)
            }} checked={userBillHelper.isPaid}></Checkbox>
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

function toggleHelperPayment(bill, helperId) {
  const updatedBill = {
    ...bill,
    BillHelpers: bill.BillHelpers.map(helper => {
      if (helper.id === helperId) {
        return { ...helper, isPaid: !helper.isPaid };
      }
      return helper;
    }),
  };
  return updatedBill;
}

export default SingleBill