import React, { useState, useContext} from 'react';
import InputLabel from "@mui/material/InputLabel";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MenuItem, TextField } from "@mui/material";
import dayjs from 'dayjs';
import Select from '@mui/material/Select';
import { LoginContext } from '../../../contexts/LoginContext';
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Checkbox } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import useHousehold from '../useHousehold';

const EditableRow = ({
  
  editFormData,
  handleEditFormChange,
  handleCancelClick,
  chore
}) => {
  const {householdMembers} = useHousehold();
  
  const householdOptions = householdMembers.map(member => (
      {
        ...member, value: member.id, label: `${member.firstName} (${member.username})`
      }
    ));
    const [error, setError] = useState(null);
    const errorMessage = (error ? "invalid date" : "");
  return (
    <TableRow>
      <TableCell align='center'><Checkbox disabled={true} checked={chore.isComplete}></Checkbox></TableCell>
      <TableCell aling='center'>
      <TextField InputLabelProps={{shrink: true}}
        id = "choreName" 
       label = "Chore Name" 
       value = {editFormData.choreName}
       required = {true}
       onChange = {e => {e.preventDefault(); handleEditFormChange(e.target.value,"choreName")}}>
       </TextField>
      </TableCell>
      <TableCell align = 'center'>
      <FormControl fullWidth>
      <InputLabel id="selected-label" shrink={true}>Assign User</InputLabel>
      <Select
      notched = {true}
      value = {editFormData.assignedTo}
      labelId="selected-label"
      label = "Assign User"
      id = "assignedTo"
      required = {true}
      onChange = {e => {e.preventDefault(); handleEditFormChange(e.target.value,"assignedTo")}}
      displayEmpty = {true}
      >{
        householdOptions.map((user) => {
          return <MenuItem value = {user.id} key = {user.id}>{user.firstName}</MenuItem>
        })
      }
      </Select>
      </FormControl>
      </TableCell>
      <TableCell align='center'>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker label="Due Date" disablePast={true}
        value = {dayjs(editFormData.dueDate)} 
      onChange = {(newValue)=> handleEditFormChange(newValue, "dueDate")}
      onError = {(newError)=>setError(newError)}
      slotProps={{textField: {helperText: errorMessage}}}
        name = "dueDate"
        required = {true}

        />
    </LocalizationProvider> 
      </TableCell>
      <TableCell align='center'>
        <button type="submit" disabled={error}>Save</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </TableCell>
    </TableRow>
  );
};

export default EditableRow;
