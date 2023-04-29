import { useContext, useState } from "react";
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
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import InputLabel from "@mui/material/InputLabel";
const EditChores = ({handleClose, open, defaultChore, defaultAssigned, defaultDate}) => {
  const {getAllChores} = useChores();
  const rows = getAllChores();
  const {user} = useContext(LoginContext);
  const houseId = user.Household.id;
  const householdMembers = getHouseholdMembers(houseId);
  const [newChoreName, setNewChoreName] = useState(defaultChore);
  const [newAssignedID, setNewAssignedID] = useState(defaultAssigned);
  const [newDueDate, setNewDueDate] = useState(dayjs(defaultDate));
  const householdOptions = householdMembers.map(member => (
    {
      ...member, value: member.id, label: `${member.firstName} (${member.username})`
    }
  ));

  const changeChoreName = (event) => {
    setNewChoreName(event.target.value);
  };
  
  const changeAssigned = (event) => {
    setNewAssignedID(event.target.value)
  }

  
  const transferValue = (event) => {
    event.preventDefault();
    const val = {
      newChoreName,
      newAssignedID,
      newDueDate: new Date(newDueDate)
    };
    clearState();
    //editRows(val);
  };
  
  const clearState = () => {
    setNewAssignedID('');
    setNewChoreName('');
    setNewDueDate('');
  };

  return (
      <Dialog open={open} onClose={handleClose} PaperProps={{sx: {height: 600}}}>
      <DialogTitle>Edit</DialogTitle>
      <DialogContent style={{display: "flex", "flex-direction": "column", justifyContent: "space-evenly"}}>
      <TextField InputLabelProps={{shrink: true}} value={newChoreName} label = "Chore Name" onChange={(e) => setNewChoreName(e.target.value)} />
      <FormControl fullWidth>
      <InputLabel id="selected-label" shrink={true}>Assign User</InputLabel>
      <Select
      notched = {true}
      labelId="selected-label"
      label = "Assign User"
      id = "assigned"
      onChange = {(e) => setNewAssignedID(e.target.value)}
      value={newAssignedID}
      displayEmpty = {true}
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
        value={newDueDate}
        onChange={(newDate) => setNewDueDate(newDate)}
        error = {false}
        />
      </DemoContainer>
    </LocalizationProvider> 
  </DialogContent>
      <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={transferValue}>Edit Chore</Button>
        </DialogActions>
      </Dialog>
  );
}
  
export default EditChores;