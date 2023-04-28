import { Outlet, useParams, Navigate } from 'react-router-dom'
import useBills from './useBills';
import { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';

const ProtectedSingleBillRoute = () => {
    const { billId } = useParams();
    const { getBill } = useBills();
    const [bill, setBill] = useState({});
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchBill = async () => {
            const bill = await getBill(billId);

            setBill(bill);
            setLoading(false);
        };

        fetchBill();
    }, [bill]);
    
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
            <Outlet context={{ bill, setBill }} />
        </>
    )
}

export default ProtectedSingleBillRoute;