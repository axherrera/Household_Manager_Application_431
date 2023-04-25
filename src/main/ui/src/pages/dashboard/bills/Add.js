import React, { useContext } from 'react'
import Form from './Form'
import { newEmptyBill } from '../../../data';
import { LoginContext } from '../../../contexts/LoginContext';
import { useNavigate } from 'react-router-dom';

const Add = () => {
    const { setBills } = useContext(LoginContext);
    const { user } = useContext(LoginContext)
    const houseId = user.Household.id;

    const handleMockSubmit = (newBill) => {
        setBills(bills => {
            const newBillId = bills.reduce((acc, curr) => {
                const currId = parseInt(curr.id);
                if (currId > acc) {
                    return currId;
                } else {
                    return acc;
                }
            }, 0) + 1;

            return [...bills, { ...newBill, id: newBillId.toString(), houseId: houseId }]
        })
    }

    const handleSubmit = (newBill) => {
        if (process.env.REACT_APP_MOCK) {
            handleMockSubmit(newBill);
        }
    }

    return (
        <Form bill={newEmptyBill} handleSubmit={handleSubmit} />
    )
}

export const Button = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/dashboard/bills/add');
    }

    return (
        <button onClick={handleClick}>Add Bill</button>
    );
}

export default Add;