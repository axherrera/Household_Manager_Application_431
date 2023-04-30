import React, { useState, useContext, Fragment } from 'react';
import EditableRow from './EditableRow';
import InputLabel from "@mui/material/InputLabel";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { MenuItem, TextField } from "@mui/material";
import Select from '@mui/material/Select';
import ReadOnlyRow from './ReadOnlyRow';
import { LoginContext } from '../../../contexts/LoginContext';
import useChores from "./useChores";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import AddIcon from '@mui/icons-material/Add';
import styles from './Chores.module.css'
import FormControl from '@mui/material/FormControl';
import useHousehold from '../useHousehold';

function TableData(){
  const {user} = useContext(LoginContext);
  const {getAllChores, deleteChore} = useChores();
  const rows = getAllChores();
  const [editOpen, setEditOpen] = useState(false);
  const houseId = user.Household.id;
  const {householdMembers} = useHousehold();
  const householdOptions = householdMembers.map(member => (
      {
        ...member, value: member.id, label: `${member.firstName} (${member.username})`
      }
    ));
  const [choreData, setChoreData] = useState(rows);

  const [addFormData, setAddFormData] = useState({
    id:"",
    choreName: "",
    assignedID: "",
    dueDate: dayjs(new Date()).format('YYYY-MM-DD'),
    isComplete: "",
    houseId: ""
  });

  const [editFormData, setEditFormData] = useState({
    choreName: "",
    assignedID: "",
    dueDate: "",
    isComplete: "",
    houseId: ""
  });

  const [editChoreId, setEditChoreId] = useState(null);
  const [checkChoreId, setEditCheckChoreId] = useState(null);
  const [dialogOpen, isDialogOpen] = useState(false);
  const handleAddFormChange = (newVal, keyVal) => {

    const fieldName = keyVal;
    var fieldValue = newVal;
    if (fieldName === "dueDate"){
      fieldValue =dayjs(newVal).format('YYYY-MM-DD')
    }
    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);

  };

  const handleEditFormChange = (val, nameType) => {
    const fieldName = nameType;
    var fieldValue = val;
    if (nameType ==="dueDate"){
      fieldValue = dayjs(val).format('YYYY-MM-DD')
    }
  

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();
    const newChoreId = choreData.reduce((acc, curr) => {
      const currId = parseInt(curr.id);
      if (currId > acc) {
        return currId;
      } else {
        return acc;
      }
    }, 0) + 1;
    const newChore = {
      id: newChoreId,
      choreName: addFormData.choreName,
      assignedID: addFormData.assignedID,
      dueDate: addFormData.dueDate,
      isComplete: false,
      houseId: houseId
    };

    const newChoreList = [...choreData, newChore];
    setChoreData(newChoreList);
    setEditOpen(false);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    const editedChore = {
      id: editChoreId,
      choreName: editFormData.choreName,
      assignedID: editFormData.assignedID,
      dueDate: editFormData.dueDate,
      isComplete: false,
      houseId: houseId,
    };

    const newChoreList = [...choreData];

    const index = choreData.findIndex((chore) => chore.id === editedChore.id);
    newChoreList[index] = editedChore;

    setChoreData(newChoreList);
    setEditChoreId(null);
  };
  const handleChecked = (val, chore) => {


    const editedChore = {
      id: chore.id,
      choreName: chore.choreName,
      assignedID: chore.assignedID,
      dueDate: chore.dueDate,
      isComplete: val,
      houseId: houseId,
    };
    const newChoreList = [...choreData];

    const index = choreData.findIndex((el) => el.id === editedChore.id);
    newChoreList[index] = editedChore;
    setChoreData(newChoreList);
  };
  const handleEditClick = (event, chore) => {
    event.preventDefault();
    setEditChoreId(chore.id);

    const formValues = {
      choreName: chore.choreName,
      assignedID: chore.assignedID,
      dueDate: chore.dueDate,
    };

    setEditFormData(formValues);
  };
  

  const handleCancelClick = () => {
    setEditChoreId(null);
  };

  const handleDeleteClick = (choreIndex) => {
    setChoreData((prevChores) => prevChores.filter((_, index) => index !== choreIndex));  
  };


  const handleClose = () => {
    setEditOpen(false)
  }
  const addChoreClick = () => {
    setEditOpen(true)
  }
  const [error, setError] = useState(null);
    const errorMessage = (error ? "invalid date" : "");
  return (
    <div className={styles.appContainer}>
    <form onSubmit={handleEditFormSubmit}>
        <Table aria-label = "simple table">
          <TableHead>
            <TableRow>
            <TableCell align='center'>Completed</TableCell>
              <TableCell align='center'>Chore Name</TableCell>
              <TableCell align='center'>Assigned User</TableCell>
              <TableCell align='center'>Due Date</TableCell>
              <TableCell align='center' >Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {choreData.map((chore, choreIndex) => (
              <Fragment>
                {editChoreId === chore.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                    chore={chore}
                  />
                ) : (
                  <ReadOnlyRow
                    chore={chore}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                    choreIndex={choreIndex}
                    handleChecked={handleChecked}
                  />
                )}
              </Fragment>
            ))}
          </TableBody>
        </Table>
        </form>
        <div className= {styles.btnContainer}>         
      <Button startIcon={<AddIcon/>} onClick={addChoreClick}>Add Chore</Button>
      </div>
      <form onSubmit={handleAddFormSubmit}>
    <Dialog disablePortal open={editOpen} onClose={handleClose} PaperProps={{sx: {height: 600}}}>
    <DialogTitle>Add Chore</DialogTitle>
      <DialogContent style={{display: "flex", "flex-direction": "column", justifyContent: "space-evenly"}}>
      <TextField InputLabelProps={{shrink: true}} 
       label = "Chore Name" 
       required = {true}
       onChange = {e => {e.preventDefault(); handleAddFormChange(e.target.value,"choreName")}}/>
      <FormControl fullWidth>
      <InputLabel id="selected-label" shrink={true}>Assign User</InputLabel>
      <Select
      notched = {true}
      labelId="selected-label"
      label = "Assign User"
      id = "assignedID"
      required = {true}
      onChange = {e => {e.preventDefault(); handleAddFormChange(e.target.value,"assignedID")}}
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
        <DatePicker label="Due Date" disablePast={true}
      onChange = {(newValue)=> handleAddFormChange(newValue, "dueDate")}
      onError = {(newError)=>setError(newError)}
      slotProps={{textField: {helperText: errorMessage}}}
        name = "dueDate"
        required = {true}        
        defaultValue={dayjs(new Date())}
        />
      </DemoContainer>
    </LocalizationProvider>
    </DialogContent>
    <DialogActions>
    <Button type="submit" disabled={error}>Add</Button>
    <Button onClick={handleClose}>Close</Button>
      </DialogActions> 
        </Dialog>
      </form>    
      </div>
  );
};
  
export default TableData;