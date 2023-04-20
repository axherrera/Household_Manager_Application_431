import React, { useContext } from 'react'
import Form from './Form'
import { useOutletContext, useNavigate } from 'react-router-dom';
import { LoginContext } from '../../../contexts/LoginContext';

const Edit = () => {
    const { bill } = useOutletContext();
    const { setBills } = useContext(LoginContext);

    const handleMockSubmit = (editedBill) => {
        setBills(bills => {
            return bills.map(bill => {
                if (bill.id === editedBill.id) {
                    return editedBill;
                }
                return bill;
            })
        })
    }

    const handleSubmit = (editedBill) => {
        if (process.env.REACT_APP_MOCK) {
            handleMockSubmit(editedBill);
        }
    }

    return (
        <Form bill={bill} handleSubmit={handleSubmit} edit />
    )
}

export const Button = ({ billId }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/dashboard/bills/${billId}/edit`);
    }

    return (
        <button onClick={handleClick}>Edit Bill</button>
    );
}


export default Edit;