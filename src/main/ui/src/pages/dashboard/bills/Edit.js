import React from 'react'
import Form from './Form'
import { useOutletContext } from 'react-router-dom';

const Edit = () => {
    const { bill } = useOutletContext();

    return (
        <Form bill={bill} />
    )
}

export default Edit