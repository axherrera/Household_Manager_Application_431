import React, { useContext, useState } from "react";
import Select from "react-select";
import { LoginContext } from '../../../contexts/LoginContext'
import useChores from "./useChores";
import { getHouseholdMembers } from "../Utils";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from "moment";
import { TextField } from "@mui/material";
import styles from "./Chores.css"
function Chores({open, handleClose, addRows}) {
  const {getAllChores} = useChores();
  const rows = getAllChores();
  const {user} = useContext(LoginContext);
  const houseId = user.Household.id;
  const householdMembers = getHouseholdMembers(houseId);
  const [choreName, setChoreName] = useState('');
  const [assignedID, setAssignedID] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const householdOptions = householdMembers.map(member => (
    {
      ...member, value: member.id, label: `${member.firstName} (${member.username})`
    }
  ));
  const changeChoreName = (event) => {
    setChoreName(event.target.value);
  };
  
  const changeAssigned = (event) => {
    setAssignedID(event.value)
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
    setDueDate(new Date());
  };

  return (
      <Dialog open={open} onClose={handleClose} PaperProps={{sx: {height: 400}}}>
      <DialogTitle>Add New Chore</DialogTitle>
      <DialogContent>
      <TextField value={choreName} margin = "dense" label = "Chore Name" onChange={changeChoreName} />
      <Select
      options={householdOptions}
      id = "assigned"
      onChange = {changeAssigned}
      value={assignedID}

      />
      <label>Due Date: 
      <input
        type="datetime-local"
        id="due-date"
        value={dueDate}
        onChange={(event) => setDueDate(event.target.VALUE)}
      />
    </label>
  </DialogContent>
      <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={transferValue}>Add chore</Button>
        </DialogActions>
      </Dialog>
  );
}
  
export default Chores;