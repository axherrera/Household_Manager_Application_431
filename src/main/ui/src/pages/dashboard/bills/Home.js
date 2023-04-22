import React from 'react'
import { Button, Divider, List, ListItem, ListItemText } from '@mui/material';
import OptionsMenu from '../../../components/OptionsMenu';
import useBills from './useBills';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';

const Home = () => {
    const { getAllBills, addBill } = useBills();
    const bills = getAllBills();

    return (
        <>
            <h2>Bills</h2>
            <BillsList bills={bills} />
            <br />
            <Button variant="contained" onClick={() => { addBill() }}>Add Bill</Button>
        </>
    )
}

const BillsList = ({ bills }) => {
    const { deleteBill, editBill } = useBills();
    const navigate = useNavigate();

    const options = [
        {
            name: 'Edit',
            onClick: (billId) => { editBill(billId) }
        },
        {
            name: 'Delete',
            onClick: (billId) => { deleteBill(billId) }
        }
    ]

    return (
        <List>
            {bills.map((bill) =>
                <React.Fragment key={bill.id}>
                    <ListItem
                        onClick={() => { navigate(`/dashboard/bills/${bill.id}`) }}
                        secondaryAction={
                            <OptionsMenu options={options} itemId={bill.id} />
                        }
                        button>
                        <ListItemText>{bill.name}: ${bill.total}</ListItemText>
                    </ListItem>
                    <Divider />
                </React.Fragment>)
            }
        </List >
    )
}


export default Home