import React from 'react'
import { useState } from 'react'

const frequencyOptions = ["single", "daily", "weekly", "monthly"];

const formatDate = (date) => {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
};

const Form = ({ bill, handleSubmit }) => {

    // Get all Bill data and set it as a state
    const [name, setName] = useState(bill.name);
    const [total, setTotal] = useState(bill.total);
    const [notes, setNotes] = useState(bill.notes);
    const [frequency, setFrequency] = useState(bill.frequency);
    const [date, setDate] = useState(formatDate(bill.date));
    const [billHelpers, setBillHelpers] = useState(bill.BillHelpers);

    const today = new Date();
    const todayString = formatDate(today);

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
            </label>
            <br />
            <label>
                Total:
                <input
                    type="number"
                    value={total}
                    onChange={(event) => setTotal(event.target.value)}
                />
            </label>
            <br />
            <label>
                Notes:
                <textarea
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                />
            </label>
            <br />
            <label>
                Frequency:
                <select
                    value={frequency}
                    onChange={(event) => setFrequency(event.target.value)}
                >
                    {frequencyOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </label>
            <br />
            <label>
                Date:
                <input
                    type="date"
                    value={date}
                    min={todayString}
                    onChange={(event) => setDate(event.target.value)}
                />
            </label>
            <br />
            {/* TODO: Implement Converting Bill Helper Ids into usernames / full names and turn it into a select list */}
            <label>
                Bill Helpers:
                <input
                    type="text"
                    value={billHelpers}
                    onChange={(event) => setBillHelpers(event.target.value)}
                />
            </label>
            <br />
            <button type="submit">Save</button>
        </form>
    );
}

export default Form