import { Outlet, useParams, Navigate } from 'react-router-dom'
import useBills from './useBills';

const ProtectedSingleBillRoute = () => {
    const { billId } = useParams()

    const { getBill } = useBills();
    const bill = getBill(billId);

    if (bill == null) {
        return <Navigate to='/dashboard/bills' replace />;
    }

    return (
        <>
            <Outlet context={{ bill }} />
        </>
    )
}

export default ProtectedSingleBillRoute;