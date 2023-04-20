import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import { LoginContext } from '../../../contexts/LoginContext'
import { Button as AddBillButton } from './Add';
import { Button } from './Edit';

const GetAllMockBills = (householdId) => {
    const { bills } = useContext(LoginContext);

    return bills.filter(bill => bill.houseId === householdId);
}

const getAllBills = (householdId) => {
    if (process.env.REACT_APP_MOCK) {
        return GetAllMockBills(householdId);
    }

    return [];
}

const Home = () => {
    const { user } = useContext(LoginContext)
    const houseId = user.Household.id;

    const bills = getAllBills(houseId);

    return (
        <>
            <h2>Bills</h2>
            <div>
                {bills.map((bill) => {
                    return <article key={bill.id}>
                        <h5>{bill.name}: ${bill.total}</h5>
                        <h5>due: {bill.date.toLocaleDateString()}</h5>
                        <h6><Link to={`/dashboard/bills/${bill.id}`}>more info</Link></h6>
                        <Button billId={bill.id} /><DeleteButton billId={bill.id} />
                    </article>
                })}
            </div>
            <br />
            <AddBillButton />
        </>
    )
}

export const DeleteButton = ({ billId }) => {
    const { setBills } = useContext(LoginContext);
    const navigate = useNavigate();

    const handleMockDelete = () => {
        setBills(bills => { return bills.filter(bill => bill.id !== billId) })
    }

    const handleDelete = () => {
        if (process.env.REACT_APP_MOCK) {
            handleMockDelete();
        }

        navigate('/dashboard/bills')
    }

    return (
        <button onClick={handleDelete}>Delete Bill</button>
    )
}

export default Home