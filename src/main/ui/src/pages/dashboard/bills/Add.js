import React from 'react'
import Form from './Form'
import { newEmptyBill } from '../../../data';
import { useNavigate } from 'react-router-dom';
import useBills from './useBills';
import useHousehold from '../useHousehold';

const Add = () => {
    const { addBill } = useBills();
    const { householdMembers } = useHousehold();

    const handleSubmit = (newBill) => {
        addBill(newBill);
    }

    return (
        <Form bill={newEmptyBill} householdMembers={householdMembers} handleSubmit={handleSubmit} />
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