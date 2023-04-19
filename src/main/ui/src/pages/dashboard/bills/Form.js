import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { getHouseholdMembers } from '../Utils';
import { LoginContext } from '../../../contexts/LoginContext';
import { default as ReactSelect, components } from 'react-select';

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
        <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit({
                ...bill,
                name,
                total,
                notes,
                frequency,
                date: new Date(date),
                BillHelpers: billHelpers
            })
        }}>
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
                    step="0.01"
                    value={total}
                    onChange={(event) => setTotal(parseFloat(event.target.value))}
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
            <label>
                Bill Helpers:
            </label>
            <SelectBillHelpers 
                householdMembers={householdMembers}
                billHelpers={billHelpers}
                setBillHelpers={setBillHelpers}
                />
            <BillHelperInputs
                billHelpers={billHelpers}
                householdMembers={householdMembers}
                setBillHelpers={setBillHelpers}
            />
            {/* TODO: Split Bill Total Button */}
            <br />
            <button type="submit">Save</button>
        </form>
    );
}

const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <input
            id={props.value}
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};


const SelectBillHelpers = ({ billHelpers, householdMembers, setBillHelpers }) => {
    const householdMemberOptions = householdMembers
    .map(member => (
        {
            ...member,
            value: member.id,
            label: `${member.firstName} (${member.username})`
        })
    );

    const [selectedHouseholdMembers, setSelectedHouseholdMembers] = useState(householdMemberOptions.filter(member => billHelpers.find(billHelper => member.id === billHelper.id) != undefined));

    const handleChange = (selected) => {
        setSelectedHouseholdMembers(selected);
    }

    useEffect(() => {
        const newBillHelpers = selectedHouseholdMembers
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

    return (
      <span
        class="d-inline-block"
        data-toggle="popover"
        data-trigger="focus"
        data-content="Please selecet account(s)"
      >
        <ReactSelect
          options={householdMemberOptions}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          components={{
            Option
          }}
          onChange={handleChange}
          allowSelectAll={true}
          value={selectedHouseholdMembers}
        />
      </span>
    );
}

const BillHelperInputs = ({billHelpers, setBillHelpers, householdMembers}) => {
    const handleAmountOwedChange = (index, event) => {
        // TODO: don't allow amount owed to exceed total bill amount
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
            <br />
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