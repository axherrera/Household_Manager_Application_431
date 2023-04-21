import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { getHouseholdMembers } from '../Utils';
import { LoginContext } from '../../../contexts/LoginContext';
import { default as ReactSelect, components } from 'react-select';
import { useNavigate } from 'react-router-dom';
import DraggableConfirmationDialog from '../../../components/ConfirmationDialog';
import ErrorAlerts from '../../../components/ErrorAlerts';

const frequencyOptions = ["single", "daily", "weekly", "monthly"];

const formatDate = (date) => {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
};

const Form = ({ bill, handleSubmit, edit }) => {
    const formBill = structuredClone(bill);

    // Get all Bill data and set it as a state
    const [name, setName] = useState(formBill.name);
    const [total, setTotal] = useState(formBill.total);
    const [notes, setNotes] = useState(formBill.notes);
    const [frequency, setFrequency] = useState(formBill.frequency);
    const [date, setDate] = useState(formatDate(formBill.date));
    const [billHelpers, setBillHelpers] = useState(formBill.BillHelpers);

    const { user } = useContext(LoginContext)
    const houseId = user.Household.id;
    const householdMembers = getHouseholdMembers(houseId);

    const navigate = useNavigate();

    const navigateBack = () => {
        if (window.history.state && window.history.state.idx > 0) {
            navigate(-1);
        } else {
            navigate('/dashboard/bills', { replace: true }); // the current entry in the history stack will be replaced with the new one with { replace: true }
        }
    }

    const confirm = (e) => {
        e.preventDefault();

        handleSubmit({
            ...formBill,
            name,
            total,
            notes,
            frequency,
            date: new Date(date),
            BillHelpers: billHelpers
        })

        navigateBack();
    }

    const [alerts, setAlerts] = useState([]);
    const validInput = () => {
        let invalidInputs = [];

        if (name.trim() === "") {
            invalidInputs.push({ message: "bill cannot have empty name." });
        }

        if (billHelpers.length === 0) {
            invalidInputs.push({ message: "bill must have at least one bill helper." })
        } else {
            for (var helper of billHelpers) {
                if (isNaN(helper.amountOwed) || helper.amountOwed <= 0) {
                    invalidInputs.push({ message: "all bill helpers must owe an amount >= 0" });
                    break;
                }
            }
        }

        // date already handled for us in form

        if (total <= 0 || isNaN(total)) {
            invalidInputs.push({ message: "bill total must be > $0." })
        }

        // make sure all bill helpers sum total <= bill total
        if (!isNaN(total) && total > 0 && billHelpers.length > 0) {
            const billHelperTotal = billHelpers.reduce((acc, bill) => acc + bill.amountOwed, 0);

            if (billHelperTotal > total) {
                invalidInputs.push({ message: "bill members' sum total needs to be <= bill total" })
            }
        }

        if (invalidInputs.length !== 0) {
            setAlerts(invalidInputs.map(alert => { return { ...alert, open: true } }));
            return false;
        }

        return true;
    }

    const [dialogOpen, setDialogOpen] = useState(false);
    const onSubmit = (e) => {
        e.preventDefault();

        if (!validInput()) {
            return;
        }

        if (edit) {
            setDialogOpen(true);
        } else {
            confirm(e)
        }
    }

    const today = new Date();
    const todayString = formatDate(today);

    return (
        <>
            <DraggableConfirmationDialog open={dialogOpen} setOpen={setDialogOpen} onConfirm={confirm} />
            <ErrorAlerts alerts={alerts} setAlerts={setAlerts} />
            <h2>{edit ? 'Edit' : 'Add'} Bill</h2>
            <form onSubmit={onSubmit}>
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
                <BillHelpersList
                    billHelpers={billHelpers}
                    householdMembers={householdMembers}
                    setBillHelpers={setBillHelpers}
                    editable={true}
                />
                {/* TODO: Split Bill Total Button */}
                <br />
                <button style={{marginRight: "10vw"}} type="submit">Save</button>
                <button type="submit" onClick={navigateBack}>Cancel</button>
            </form>
        </>
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

    const [selectedHouseholdMembers, setSelectedHouseholdMembers] = useState(householdMemberOptions.filter(member => billHelpers.find(billHelper => member.id === billHelper.id) !== undefined));

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
            className="d-inline-block"
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

export const BillHelpersList = ({ billHelpers, setBillHelpers, householdMembers, editable }) => {
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
            const { firstName, username } = householdMembers.find(member => member.id === billHelper.id)
            return (<React.Fragment key={'bh-' + billHelper.id}>
                {editable && <br />}
                <label id={billHelper.id}>
                    {firstName} ({username})
                    <br />
                    <label>Amount Owed  </label>
                    {editable ? <input
                        type="number"
                        step="0.01"
                        value={billHelper.amountOwed}
                        onChange={(event) => handleAmountOwedChange(index, event)}
                    /> : billHelper.amountOwed}

                    <br />

                    <label>Paid</label>
                    {editable ? <input
                        type="checkbox"
                        checked={billHelper.isPaid}
                        onChange={(event) => handleIsPaidChange(index, event)}
                    /> : <input type="checkbox" checked={billHelper.isPaid} disabled />}

                </label>
                <br />
                {!editable && <br />}
            </React.Fragment>)
        })}
    </>)
}

export default Form