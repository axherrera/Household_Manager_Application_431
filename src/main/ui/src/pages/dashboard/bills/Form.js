import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { getHouseholdMembers } from '../Utils';
import { LoginContext } from '../../../contexts/LoginContext';

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

    const { user } = useContext(LoginContext)
    const houseId = user.Household.id;
    const householdMembers = getHouseholdMembers(houseId);

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
            </label>
            <BillHelpersCheckBoxList
                billHelpers={billHelpers}
                householdMembers={householdMembers}
                setBillHelpers={setBillHelpers}
            />
            <BillHelperInputs
                billHelpers={billHelpers}
                householdMembers={householdMembers}
                setBillHelpers={setBillHelpers}
            />
            <br />
            <button type="submit">Save</button>
        </form>
    );
}

const BillHelpersCheckBoxList = ({ billHelpers, householdMembers, setBillHelpers }) => {
    // TODO: Make CheckBoxList a Selectable Dropdown
    const [selectedHouseholdMembers, setSelectedHouseholdMembers] = useState(householdMembers
        .map(member => (
            {
                ...member,
                selected: billHelpers.some(billHelper => billHelper.id === member.id)
            })
        ));

    const handleCheckboxChange = (event) => {
        const memberId = event.target.id;
        const updatedSelectedMembers = selectedHouseholdMembers.map((member) => {
            if (member.id === memberId) {
                return { ...member, selected: !member.selected };
            } else {
                return member;
            }
        });
        setSelectedHouseholdMembers(updatedSelectedMembers);
    };

    useEffect(() => {
        const newBillHelpers = selectedHouseholdMembers
        .filter(member => member.selected)
        .map(member => {
            const newBillHelper = billHelpers.find(billHelper => billHelper.id === member.id);

            if (newBillHelper) {
                return newBillHelper;
            }

            return {
                id: member.id,
                amountOwed: 0,
                isPaid: false,
            }
        });

        setBillHelpers(newBillHelpers);
    }, [selectedHouseholdMembers]);

    return (<div>
        {selectedHouseholdMembers.map((member) => (
            <>
                <label key={member.id}>
                    <input
                        type="checkbox"
                        id={member.id}
                        checked={member.selected}
                        onChange={handleCheckboxChange}
                    />
                    {member.firstName} ({member.username})
                </label>
                <br></br>
            </>
        ))}
    </div>);
}

const BillHelperInputs = ({billHelpers, setBillHelpers, householdMembers}) => {
    const handleAmountOwedChange = (index, event) => {
        const newBillHelpers = [...billHelpers];
        newBillHelpers[index].amountOwed = parseFloat(event.target.value);
        setBillHelpers(newBillHelpers);
    };

    const handleIsPaidChange = (index, event) => {
        const newBillHelpers = [...billHelpers];
        newBillHelpers[index].isPaid = event.target.checked;
        setBillHelpers(newBillHelpers);
    };

    return (<>
        {billHelpers.map((billHelper, index) => {
            const {firstName, username} = householdMembers.find(member => member.id === billHelper.id)
            return (<>
            <label id={billHelper.id}>
                {firstName} ({username})
                <br />
                <label>Amount Owed  </label>
                <input 
                    type="number"
                    step="0.01"
                    value={billHelper.amountOwed}
                    onChange={(event) => handleAmountOwedChange(index, event)}
                />

                <br />
                <label>Paid</label>
                <input
                    type="checkbox"
                    checked={billHelper.isPaid}
                    onChange={(event) => handleIsPaidChange(index, event)}
                />
            </label>
            <br />
            </>)
        })}
    </>)
}

export default Form