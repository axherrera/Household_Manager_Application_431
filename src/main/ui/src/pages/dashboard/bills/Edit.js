import React from 'react'
import Form from './Form'
import { useOutletContext } from 'react-router-dom';

const Edit = () => {
    const { bill } = useOutletContext();
    
    const handleSubmit = (editedBill) => {
        // TODO: do validation and edit changes
    }

    return (
        <Form bill={{bill}} handleSubmit={handleSubmit}/>
    )
}

export default Edit