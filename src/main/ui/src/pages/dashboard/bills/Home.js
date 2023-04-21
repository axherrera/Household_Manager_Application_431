import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import { LoginContext } from '../../../contexts/LoginContext'
import { Button as AddBillButton } from './Add';
import { Button as EditButton } from './Edit';

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
                        {bill.BillHelpers.find(helper => helper.id === user.id) != undefined && <PayButton billId={bill.id} userId={user.id}/>}
                        <EditButton billId={bill.id} /><DeleteButton billId={bill.id} />
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

export const PayButton = ({ userId, billId }) => {
    const { setBills } = useContext(LoginContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleMockPay = () => {
        setBills(bills => { return bills.map(bill => {
            if (bill.id !== billId) {
                return bill
            }

            const updatedBillHelpers = bill.BillHelpers.map(member => {
                if (member.id === userId) {
                    return {
                        ...member,
                        isPaid: !member.isPaid
                    };
                }
                return member;
            });

            // return the updated JSON object with the modified list
            return {
                ...bill,
                BillHelpers: updatedBillHelpers
            };
        }) })
    }

    const handlePay = () => {
        if (process.env.REACT_APP_MOCK) {
            handleMockPay();
        }

        navigate(location.pathname);
    }

    return (
        <button onClick={handlePay}>Pay Bill</button>
    )
}

export default Home