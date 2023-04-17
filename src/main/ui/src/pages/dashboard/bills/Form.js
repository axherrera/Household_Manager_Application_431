import React from 'react'
import { useOutletContext } from 'react-router-dom/dist/umd/react-router-dom.development';

const Form = () => {
    const { bill } = useOutletContext();

    return (
        <div>{bill.name} {bill.id} Form</div>
    )
}

export default Form