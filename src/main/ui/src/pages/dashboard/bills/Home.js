import React, { useEffect, useState } from 'react'
import { Button, Divider, List, ListItem, ListItemText } from '@mui/material';
import OptionsMenu from '../../../components/OptionsMenu';
import useBills from './useBills';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import moment from 'moment';
import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';

const Home = () => {
    const { getAllBills, navigateToAddBill } = useBills();
    const [bills, setBills] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBills = async () => {
            const bills = await getAllBills();

            setBills(bills);
            setLoading(false);
        };

        fetchBills();
    }, [bills, loading]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        )
    } 

    return (
        <>
            <h2>Bills</h2>
            <BillsList bills={bills} setLoading={setLoading} setBills={setBills}/>
            <br />
            <Button variant="contained" onClick={() => { navigateToAddBill() }}>Add Bill</Button>
        </>
    )
}

const BillsList = ({ bills, setBills, setLoading }) => {
    const { deleteBill, navigateToEditBill } = useBills();
    const navigate = useNavigate();

    const options = [
        {
            name: 'Edit',
            onClick: (billId) => { navigateToEditBill(billId) }
        },
        {
            name: 'Delete',
            onClick: (billId) => { 
                deleteBill(billId);
                setBills(bills => bills.filter(bill => bill.id !== billId));
                setLoading(true);
            }
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
                        <ListItemText><b>{bill.name}</b>: ${bill.total} due {moment(bill.date).format('MM/DD/YY')}</ListItemText>
                    </ListItem>
                    <Divider />
                </React.Fragment>)
            }
        </List >
    )
}


export default Home