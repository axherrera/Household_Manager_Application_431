import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { mockChores } from "../../data";
import { Checkbox } from "@mui/material";
import {useState} from "react";

const rows = mockChores;
export default function Chores() {
  const [data, setData] = useState(rows);
  const addRow = () => {
    const newRow = {
      choreid: "4",
      choreName: "clean floor",
      dueDate: "N/A",
      assignedID: "4"
    }
    setData([...data, newRow]);

};
 return (
   <TableContainer component={Paper}>
     <Table aria-label="simple table">
       <TableHead>
         <TableRow>
            <TableCell>Completed</TableCell>
           <TableCell>Chore ID</TableCell>
           <TableCell align="left">Chore Name</TableCell>
           <TableCell align="left">Due Date</TableCell>
           <TableCell align="left">User Assigned</TableCell>
         </TableRow>
       </TableHead>
       <TableBody>
         {data.map((row) => (
           <TableRow key={row.number}>
            <TableCell><Checkbox/></TableCell>
             <TableCell component="th" scope="row">
               {row.choreid}
             </TableCell>
             <TableCell align="left">{row.choreName}</TableCell>
             <TableCell align="left">{row.dueDate.toString()}</TableCell>
             <TableCell align="left">{row.assignedID}</TableCell>
           </TableRow>
         ))}
       </TableBody>
     </Table>
     <button id="addBtn" onClick={addRow}>ADD</button>
   </TableContainer>
   
 );
}