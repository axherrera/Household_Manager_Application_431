import React from 'react'
import { Link } from 'react-router-dom'
import { mockBills } from '../../../data'

const Home = () => {
    return (
        <>
            <h2>Bills</h2>
            <div>
                {mockBills.map((bill) => {
                    return <article key={bill.id}>
                        <h5>{bill.name}: ${bill.total}</h5>
                        <h5>due: {bill.date.toString()}</h5>
                        <h6><Link to={`/dashboard/bills/${bill.id}`}>more info</Link></h6>
                    </article>
                })}
            </div>
            <button>add bill</button>
        </>
    )
}

export default Home