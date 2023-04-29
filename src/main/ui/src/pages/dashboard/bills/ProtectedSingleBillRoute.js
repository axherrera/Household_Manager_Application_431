import { Outlet, useParams, Navigate } from 'react-router-dom'
import useBills from './useBills';
import { useContext, useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { getHouseholdMembers } from '../Utils';
import { LoginContext } from '../../../contexts/LoginContext';

const ProtectedSingleBillRoute = () => {
    const { user } = useContext(LoginContext)
    const { billId } = useParams();
    const { getBill } = useBills();
    const [bill, setBill] = useState({});
    const [householdMembers, setHouseholdMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchBill = async () => {
            const [bill, householdMembers]= await Promise.all([getBill(billId), getHouseholdMembers(user.Household.id)]);

            setBill(bill);
            setHouseholdMembers(householdMembers);
            setLoading(false);
        };

        if (loading) {
            fetchBill();
        }
    }, [loading]);
    
    if (bill == null) {
        return <Navigate to='/dashboard/bills' replace />;
    }

    if (loading) {
        return (
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        )
    }

    return (
        <>
            <Outlet context={{ bill, setBill, setLoading, householdMembers }} />
        </>
    )
}

export default ProtectedSingleBillRoute;