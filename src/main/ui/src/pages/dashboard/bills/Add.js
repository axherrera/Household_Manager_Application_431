import React from 'react'
import Form from './Form'
import { newEmptyBill } from '../../../data';
import { useNavigate } from 'react-router-dom';
import useBills from './useBills';

const Add = () => {
    const { addBill } = useBills();

    const handleSubmit = (newBill) => {
        addBill(newBill);
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