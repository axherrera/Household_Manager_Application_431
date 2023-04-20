import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { LoginContext } from '../../../contexts/LoginContext'

const GetAllMockBills = () => {
    const { bills } = useContext(LoginContext);
    return bills;
}

const getAllBills = () => {
    if (process.env.REACT_APP_MOCK) {
        return GetAllMockBills();
    }

    return [];
}

const Home = () => {
    const bills = getAllBills();

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