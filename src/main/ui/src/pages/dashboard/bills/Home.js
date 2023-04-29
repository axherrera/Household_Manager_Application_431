import React, { useEffect, useState } from 'react'
import { Button, Divider, Grid, List, ListItem, ListItemText, Typography } from '@mui/material';
import OptionsMenu from '../../../components/OptionsMenu';
import useBills from './useBills';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import moment from 'moment';
import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import RefreshIcon from '@mui/icons-material/Refresh';

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
    }, [loading]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        )
    } 

    return (
        <Grid>
            <Grid item xs={12} container justifyContent="flex-end" alignItems="center">
                <Grid item xs={8}>
                    <Typography variant="h5">Bills</Typography>
                </Grid>
                <Grid item xs={4} borderColor={"red"}>
                <Button onClick={() => {setLoading(true)}}>
                    <Typography variant="button" fontSize={"small"}>
                        refresh
                    </Typography>
                    <RefreshIcon fontSize="small"/>
                </Button>
                </Grid>
            </Grid>
            {/* <h2>Bills</h2> <RefreshIcon color="primary"/> */}
            <Grid item>
                <BillsList bills={bills} setLoading={setLoading} setBills={setBills}/>
            </Grid>
            <br />
            <Button variant="contained" onClick={() => { navigateToAddBill() }}>Add Bill</Button>
        </Grid>
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