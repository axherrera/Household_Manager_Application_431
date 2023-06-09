import React from 'react'
import Form from './Form'
import { useOutletContext, useNavigate } from 'react-router-dom';
import useBills from './useBills';

const Edit = () => {
    const { bill, setBill, householdMembers } = useOutletContext();
    const { editBill } = useBills();

    const handleSubmit = (editedBill) => {
        editBill(bill.id, editedBill);
        setBill(editedBill);
    }

    return (
        <Form bill={bill} householdMembers={householdMembers} handleSubmit={handleSubmit} edit />
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