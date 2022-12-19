import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

function createData(regDate, firstName, lastName, email, username, phone, bio) {
  return { regDate, firstName, lastName, email, username, phone, bio};
}

const rows = [
  createData("Registration Date", "Dec 12, 22."),
  createData("First Name", "Bello"),
  createData("Last Name", "Usman A."),
  createData("Email", "him@gmail.com"),
  createData("Username", "usman123"),
  createData("Phone", "123456789"),
  createData("Bio", "lorem ipsum dolor sit amet, consectetur adipiscing"),
];

const User = () => {
  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.username}
            >
              <TableCell sx={{ border: 0 }} align="right">{row.email}</TableCell>
              <TableCell sx={{ border: 0 }} align="right">{row.username}</TableCell>
              <TableCell sx={{ border: 0 }} align="right">{row.firstName}</TableCell>
              <TableCell sx={{ border: 0 }} align="right">{row.lastName}</TableCell>
              <TableCell sx={{ border: 0 }} align="right">{row.phone}</TableCell>
              <TableCell sx={{ border: 0 }} align="right">{row.bio}</TableCell>
              <TableCell sx={{ border: 0 }} align="right">{row.regDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default User