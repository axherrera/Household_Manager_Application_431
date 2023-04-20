import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { LoginContext } from '../../../contexts/LoginContext'

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
                        <h5>due: {bill.date.toString()}</h5>
                        <h6><Link to={`/dashboard/bills/${bill.id}`}>more info</Link></h6>
                    </article>
                })}
            </div>
            <button>add bill</button>
        </>
    )
}

export default Home