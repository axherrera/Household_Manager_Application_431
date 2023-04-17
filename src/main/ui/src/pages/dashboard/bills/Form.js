import React from 'react'
import { useParams } from 'react-router-dom'

const Form = () => {
    const { billId } = useParams();

    return (
        <div>{billId} Form</div>
    )
}

export default Form