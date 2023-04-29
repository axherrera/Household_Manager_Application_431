import React, { useState, useContext, Fragment } from 'react';
import Chores from './Chores';
import InputLabel from "@mui/material/InputLabel";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { MenuItem, TextField } from "@mui/material";
import dayjs from 'dayjs';
import Select from '@mui/material/Select';
import ReadOnlyRow from './ReadOnlyRow';
import { LoginContext } from '../../../contexts/LoginContext';
import { getHouseholdMembers } from "../Utils";
import useChores from "./useChores";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Checkbox } from "@mui/material";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import AddIcon from '@mui/icons-material/Add';
import styles from './Chores.module.css'
import  DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FormControl from '@mui/material/FormControl';
import DialogActions from '@mui/material/DialogActions';

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
  chore
}) => {
  const {user} = useContext(LoginContext);
  const houseId = user.Household.id;
  const householdMembers = getHouseholdMembers(houseId);
  const householdOptions = householdMembers.map(member => (
    {
      ...member, value: member.id, label: `${member.firstName} (${member.username})`
    }
  ));
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
      value = {editFormData.assignedID}
      labelId="selected-label"
      label = "Assign User"
      id = "assignedID"
      required = {true}
      onChange = {e => {e.preventDefault(); handleEditFormChange(e.target.value,"assignedID")}}
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
        value = {dayjs(editFormData.dueDate.toString())} 
      onChange = {(newValue)=> handleEditFormChange(newValue, "dueDate")}
      error = {false}
        name = "dueDate"
        required = {true}
        />
    </LocalizationProvider> 
      </TableCell>
      <TableCell align='center'>
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </TableCell>
    </TableRow>
  );
};

export default EditableRow;
