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
                setBillHelpers={setBillHelpers} />
            {/* <label>
                Bill Helpers:
                <input
                    type="text"
                    value={billHelpers}
                    onChange={(event) => setBillHelpers(event.target.value)}
                />
            </label> */}
            <br />
            <button type="submit">Save</button>
        </form>
    );
}

const BillHelpersCheckBoxList = ({ billHelpers, householdMembers, setBillHelpers }) => {
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

    // TODO: When selected bill helpers checkbox changes, change the billhelpers
    useEffect(() => {
        // setBillHelpers(prevBillHelpers => {
        //     return selectedHouseholdMembers
        //     .filter(member => member.selected)
        //     .map(member => {
        //         if (prevBillHelpers)
        //     })
        // });
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
    // efficiency is not an issue because list of household members is typically a constant size

    // Work with three lists: 
    // 1. full householdMembers list 
    // householdMembers = [ {id: ..., username: ..., firstName, lastName, ...}]

    // 2. Create a New List:
    // selectedHouseholdMembers = householdMembers but with a selected: boolean key
    // where it starts off with the billHelpers as selected = true

    // 3. Bill Helpers householdMembers list
    // billHelpers = [{id: "1", amountOwed: 100.11, isPaid: true,}]

    // TODO Function:
    // on a selectedHouseholdMembers change,
    // for all of the selected ids:
    // if the selected id is not in the billHelpers, add to billHelpers with default values

    // TODO: Display all of this stuff
}

export default Form