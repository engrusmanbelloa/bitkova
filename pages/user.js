import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(regDate, fName, lName, username, email,  phone, bio) {
  return { regDate, fName, lName, username, email, fName, lName, phone, bio };
}

const rows = [
  createData('Registered date', "Dec 12, 2022"),
  createData('Fisrt name', "Bello"),
  createData('Last name', "Usman"),
  createData('username', "Bello1234"),
  createData("email", "bello@gmail.com"),
  createData('Phone', "1234567890"),
  createData('Bio', "lorem ipsum dolor sit amet, consectetur adipiscing elit"),
];

export default function BasicTable() {
  return (
    <TableContainer sx={{ width: "100%"}} component={Paper}>
      <Table aria-label="simple table">
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.username}
            >
              <TableCell sx={{ border: 0, fontSize: 20 }} component="th" scope="row">{row.regDate}</TableCell>
              <TableCell sx={{ border: 0, fontSize: 20}} align="left">{row.fName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}