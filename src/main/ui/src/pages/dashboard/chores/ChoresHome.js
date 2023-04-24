import React, { useState, useContext } from 'react';
import Chores from './Chores';
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
import DialogActions from '@mui/material/DialogActions';
import styles from '././Chores.css'
import  DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'
function TableData() {
  const {user} = useContext(LoginContext);
  const {getAllChores, deleteChore} = useChores();
  const rows = getAllChores();
  const [choreName, setChoreName] = useState('');
  const [assigned, setAssigned] = useState('');
  const [deadline, setDeadline] = useState('');
  const [choreData, setChoreData] = useState(rows);
  const [open, setOpen] = useState(false);
  const houseId = user.Household.id;
  const householdMembers = getHouseholdMembers(houseId);
  var defaultChore = "";
  var defaultDate = new Date();
  var defaultAssigned = "";


  const addRows = (data) => {
    const totalChores = choreData.length;
    data.id = totalChores + 1;
    const updatedChoreData = [...choreData];
    updatedChoreData.push(data);
    setChoreData(updatedChoreData);
  };
  const handleClickOpen = () => {
     defaultChore = "";
     defaultAssigned = "";
     defaultDate = new Date();
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = (event, choreid) => {
    deleteChore(choreid)
  }
  const tableRows = choreData.map((chore) => {
    return (
      <TableRow key = {chore.number}>
        <TableCell><Checkbox/></TableCell>
        <TableCell align = "left">{chore.choreName}</TableCell>
        <TableCell align = "left">{chore.dueDate.toString()}</TableCell>
        <TableCell align = "left">{chore.assignedID}</TableCell>
        <TableCell> <Button variant="outlined" onClick = {(event)=>handleDelete(event, chore.choreid)} startIcon={<DeleteIcon />}> Delete</Button></TableCell>
        <TableCell> <Button variant="outlined" startIcon={<EditIcon />}> Edit</Button></TableCell>
      </TableRow>
    );
  });
  return (
    <div>
        <TableContainer component = {Paper} >
        <Table aria-label="simple table">
        <TableHead>
        <TableRow>
           <TableCell>Completed</TableCell>
           <TableCell align="left">Chore Name</TableCell>
           <TableCell align="left">Due Date</TableCell>
           <TableCell align="left">User Assigned</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{tableRows}</TableBody>
        </Table>
        <div>
    <div className= {styles.btnContainer}>
    <button className= {styles.btn} type='submit' onClick={handleClickOpen}>
      Add Chore
    </button>
    </div>
     <Chores addRows = {addRows} handleClose = {handleClose} open = {open} 
     defaultChore={defaultChore} defaultDate={defaultDate} defaultAssigned={defaultAssigned}/>
     </div>
    </TableContainer>
    </div>
  );
}
  
export default TableData;