import React, { useContext, useState } from "react";
import { LoginContext } from '../../../contexts/LoginContext'
import useChores from "./useChores";
import { getHouseholdMembers } from "../Utils";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import moment from "moment";
import { MenuItem, TextField } from "@mui/material";
import styles from "./Chores.css";
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
function Chores({open, handleClose, addRows, defaultChore, defaultDate, defaultAssigned}) {
  const {getAllChores} = useChores();
  const rows = getAllChores();
  const {user} = useContext(LoginContext);
  const houseId = user.Household.id;
  const householdMembers = getHouseholdMembers(houseId);
  const [choreName, setChoreName] = useState('');
  const [assignedID, setAssignedID] = useState('');
  const [dueDate, setDueDate] = useState('');
  const householdOptions = householdMembers.map(member => (
    {
      ...member, value: member.id, label: `${member.firstName} (${member.username})`
    }
  ));
  const changeChoreName = (event) => {
    setChoreName(event.target.value);
  };
  
  const changeAssigned = (event) => {
    setAssignedID(event.target.value)
  }

  
  const transferValue = (event) => {
    event.preventDefault();
    const val = {
      choreName,
      assignedID,
      dueDate: new Date(dueDate)
    };
    addRows(val);
    clearState();
  };
  
  const clearState = () => {
    setAssignedID('');
    setChoreName('');
    setDueDate();
  };

  return (
      <Dialog open={open} onClose={handleClose} PaperProps={{sx: {height: 600}}}>
      <DialogTitle>Add New Chore</DialogTitle>
      <DialogContent>
      <TextField value={choreName} margin = "dense" label = "Chore Name" defaultValue={defaultChore} onChange={changeChoreName} />
      <FormControl fullWidth>
      <Select
      id = "assigned"
      onChange = {changeAssigned}
      value={assignedID}
      defaultValue= {defaultAssigned}
      >{
        householdOptions.map((user) => {
          return <MenuItem value = {user.id} key = {user.id}>{user.firstName}</MenuItem>
        })
      }
      </Select>
      </FormControl>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker label="Due Date" 
        value={dueDate}
        onChange={(newDate) => setDueDate(newDate)}
        defaultValue={dayjs(defaultDate)}
        />
      </DemoContainer>
    </LocalizationProvider> 
  </DialogContent>
      <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={transferValue}>Add chore</Button>
        </DialogActions>
      </Dialog>
  );
}
  
export default Chores;