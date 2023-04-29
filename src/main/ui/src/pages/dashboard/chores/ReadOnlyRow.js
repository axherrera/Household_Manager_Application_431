import {React, useContext} from "react";
import dayjs, { Dayjs } from 'dayjs';
import { TableCell, TableRow } from "@mui/material";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { LoginContext } from '../../../contexts/LoginContext';
import { Checkbox } from "@mui/material";
import { getHouseholdMembers } from "../Utils";
import moment from "moment";
function findValByKey(searchKey, searchValue, targetKey, household) {
    const item = household.find((item)=>item[searchKey] === searchValue)
    if (item){
    return item[targetKey];
    }
    else {
        return null;
    }
}

const ReadOnlyRow = ({ chore, choreIndex, handleEditClick, handleDeleteClick, handleChecked}) => {
    const {user} = useContext(LoginContext);
    const houseId = user.Household.id;
    const householdMembers = getHouseholdMembers(houseId);    
    const assignedName = findValByKey("id", chore.assignedID, "firstName", householdMembers)
    const date = moment(chore.dueDate).format('dddd MMMM Do YYYY, h:mm a');

  return (
    <TableRow>
      <TableCell align='center'> <Checkbox checked={chore.isComplete} disabled={user.id!==chore.assignedID}           
      onClick={()=> {handleChecked(!chore.isComplete, chore)}}
></Checkbox></TableCell>
      <TableCell align='center'>{chore.choreName}</TableCell>
      <TableCell align='center'>{assignedName}</TableCell>
      <TableCell align='center'>{date}</TableCell>
      <TableCell align='center'>
        <Button
         startIcon={<EditIcon/>}
         disabled={user.id!==chore.assignedID}   
          onClick={(event) => handleEditClick(event, chore)}
        >
          Edit
        </Button>
        <Button
        startIcon={<DeleteIcon/>}
        disabled={user.id!==chore.assignedID}   
          onClick={() => handleDeleteClick(choreIndex)}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default ReadOnlyRow;