import { useContext } from 'react';
import { Outlet, useParams, Navigate } from 'react-router-dom'
import { LoginContext } from '../../../contexts/LoginContext'

const GetMockBill = (id, householdId) => {
    const { bills } = useContext(LoginContext);

    return bills.find((bill) => bill.id === id && bill.houseId === householdId);
}

const getBill = (id, householdId) => {
    if (process.env.REACT_APP_MOCK) {
        return GetMockBill(id, householdId)
    }

    return null;
}

const ProtectedSingleBillRoute = () => {
    const { billId } = useParams()
    const { user } = useContext(LoginContext)
    const houseId = user.Household.id;

    const bill = getBill(billId, houseId);

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