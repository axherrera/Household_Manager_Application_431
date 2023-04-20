import React, { useContext } from 'react'
import Form from './Form'
import { useOutletContext } from 'react-router-dom';
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
        <Form bill={bill} handleSubmit={handleSubmit} />
    )
}


export default Edit;