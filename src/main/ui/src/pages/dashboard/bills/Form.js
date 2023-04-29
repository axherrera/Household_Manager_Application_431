import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { LoginContext } from '../../../contexts/LoginContext';
import { useNavigate } from 'react-router-dom';
import DraggableConfirmationDialog from '../../../components/ConfirmationDialog';
import ErrorAlerts from '../../../components/ErrorAlerts';
import { Button, Card, FormControl, Grid, InputLabel, List, ListItem, ListItemText, MenuItem, Select, TextField, Typography } from '@mui/material';
import MultiSelect from '../../../components/MultiSelect';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import useHousehold from '../useHousehold';

const frequencyOptions = ["single", "daily", "weekly", "monthly"];

const Form = ({ bill, handleSubmit, edit }) => {
    const formBill = structuredClone(bill);

    const [dateError, setDateError] = useState(null);

    const errorMessage = React.useMemo(() => {
        switch (dateError) {
            case 'disablePast':
            case 'minDate': {
                return 'Cannot select a date before today';
            }

            case 'maxDate':
            case 'invalidDate': {
                return 'Your date is not valid';
            }

            default: {
                return '';
            }
        }
    }, [dateError]);

    // Get all Bill data and set it as a state
    const [name, setName] = useState(formBill.name);
    const [total, setTotal] = useState(formBill.total);
    const [notes, setNotes] = useState(formBill.notes);
    const [frequency, setFrequency] = useState(formBill.frequency);
    const [date, setDate] = useState(formBill.date);
    const [billHelpers, setBillHelpers] = useState(formBill.BillHelpers);
    const [invalidDate, setInvalidDate] = useState(false);
    
    const { user } = useContext(LoginContext);
    const { householdMembers } = useHousehold();

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
            household: user.Household.id,
            name,
            total,
            notes,
            frequency,
            date,
            BillHelpers: billHelpers
        })

        navigateBack();
    }

    const [alerts, setAlerts] = useState([]);
    const validInput = () => {
        let invalidInputs = [];

        if (invalidDate) {
            invalidInputs.push({ message: "invalid date." });
        }

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

    return (
        <>
            <DraggableConfirmationDialog open={dialogOpen} setOpen={setDialogOpen} onConfirm={confirm} />
            <ErrorAlerts alerts={alerts} setAlerts={setAlerts} />
            <Typography gutterBottom variant="h5" align="center">{edit ? 'Edit' : 'Add'} Bill</Typography>
            <Card>
                <form onSubmit={onSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Name" value={name} size="small" onChange={(e) => setName(e.target.value)} fullWidth margin="normal" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Total" value={total} size="small" onChange={(e) => setTotal(e.target.value)} fullWidth margin="normal" type="number" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker label="Due Date" 
                                    value={dayjs(date)}
                                    defaultValue={dayjs(date)}
                                    disablePast
                                    reduceAnimations
                                    onChange={(date, context) => {
                                        if (context.validationError) {
                                            setInvalidDate(true);
                                        } else {
                                            setDate(dayjs(date).format('YYYY-MM-DD'));
                                            setInvalidDate(false);
                                        }
                                    }}
                                    onError={(newError) => setDateError(newError)}
                                    slotProps={{
                                        textField: {
                                        helperText: errorMessage,
                                        },
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="frequency-label">Frequency</InputLabel>
                                <Select labelId="frequency-label" value={frequency} size="small" onChange={(e) => setFrequency(e.target.value)}>
                                {frequencyOptions.map(frequencyOption =>
                                <MenuItem key={frequencyOption} value={frequencyOption}>{frequencyOption}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                        {
                            householdMembers.length !== 0
                            &&
                            <Grid item xs={12} sm={12}>
                                <SelectBillHelpers
                                    householdMembers={householdMembers}
                                    billHelpers={billHelpers}
                                    setBillHelpers={setBillHelpers}
                                />
                            </Grid>
                        }
                        <Grid item xs={12} sm={12} style={{ zIndex: 100 }}>
                            <BillHelpersList
                                billHelpers={billHelpers}
                                householdMembers={householdMembers}
                                setBillHelpers={setBillHelpers}
                                editable={true}
                                userId={user.id}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Notes"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                fullWidth
                                multiline
                                margin="normal" />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" type="submit">
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Card>
        </>
    );
}


const SelectBillHelpers = ({ billHelpers, householdMembers, setBillHelpers }) => {
    const users = householdMembers.map(member => member.username);

    const [selectedUsers, setSelectedUsers] = useState(
        householdMembers
        .filter(member => billHelpers.find(billHelper => member.id === billHelper.id) !== undefined)
        .map(selectedMember => selectedMember.username)
    );

    useEffect(() => {
        setBillHelpers(
            billHelpers => 
                householdMembers
                .filter(member => selectedUsers.includes(member.username))
                .map(selectedMember => {
                    const billHelper = billHelpers.find(billHelper => billHelper.id === selectedMember.id);

                    if (billHelper === undefined) {
                        return {
                            id: selectedMember.id,
                            amountOwed: 0,
                            isPaid: false
                        }
                    }

                    return billHelper;
                })
        )
    }, [selectedUsers, householdMembers, setBillHelpers])

    return (<MultiSelect defaultLabel={"Bill Helpers"} options={users} selectedOptions={selectedUsers} setSelectedOptions={setSelectedUsers}></MultiSelect>)
}

export const BillHelpersList = ({ billHelpers, setBillHelpers, householdMembers, editable, userId }) => {
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
    <List>
        {billHelpers.map((billHelper, index) => {
            const { firstName = '', username = ''} = householdMembers.find(member => member.id === billHelper.id) || {}
            return (<ListItem key={'bh-' + billHelper.id}>
                {editable && <br />}
                <label id={billHelper.id}>
                <ListItemText primary={`${firstName} (${username})`} />
                    <label>Amount Owed:  </label>
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
                        disabled={billHelper.id !== userId}
                        onChange={(event) => handleIsPaidChange(index, event)}
                    /> : <input type="checkbox" checked={billHelper.isPaid} disabled />}

                </label>
                <br />
                {!editable && <br />}
            </ListItem>)
        })}
    </List>
    </>)
}

export default Form