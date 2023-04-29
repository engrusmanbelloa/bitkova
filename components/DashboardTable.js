import React, { useState, useEffect } from 'react'
import styled from "styled-components"
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import Paper from '@mui/material/Paper'
import moment from 'moment'
import {mobile, ipad} from "../responsive"

const VerticalTableContainer = styled(TableContainer)`
  width: 1000px;
  background: #1C3879;
  height: 60%;
  ${ipad({width: "500px", height: "75%", marginLeft: 15, marginTop: 10})}
  ${mobile({fontWeight: 300, width: "275px", marginLeft: 5})}
`;

const VerticalTable = styled(Table)`
  display: flex;
  flex-direction: row;
`;

const StyledTableHeader = styled(TableHead)`
  flex: 1;
`;

const VerticalTableRow = styled(TableRow)`
  display: flex;
  flex-direction: column;
  align-items: left;
`;

const StyledTableBody = styled(TableBody)`
  flex: 3;
`;

const VerticalTableCell = styled(TableCell)`
  height: 25px; 
  font-size: 20px;
  font-weight: 500;
  border: none;
  margin: 0;
  padding: 12px;
  color: #FFFFFF;
  ${ipad({fontSize: 18, height: 20 })}
  ${mobile({fontSize: 12, fontWeight: 300,})}
`;

const DashboardTable = (props )=> {
  const {user, head} = props
  return (
    <>
      <VerticalTableContainer  component={Paper}>
        <VerticalTable>
          <StyledTableHeader>
            <VerticalTableRow>
            {head && head.map((option) =>(
              <VerticalTableCell key={option}>{option}:</VerticalTableCell>
            ))}
            </VerticalTableRow>
          </StyledTableHeader>
          <StyledTableBody>
              <VerticalTableRow >
                <VerticalTableCell>
                  {moment(user.createdAt).fromNow().charAt(0).toUpperCase() + moment(user.createdAt).fromNow().slice(1)}
                </VerticalTableCell>
                <VerticalTableCell>{user.name}</VerticalTableCell>
                <VerticalTableCell>{user.username}</VerticalTableCell>
                <VerticalTableCell>{user.email}</VerticalTableCell>
                <VerticalTableCell>+234{user.phone}</VerticalTableCell>
                <VerticalTableCell>{user.bio}</VerticalTableCell>
              </VerticalTableRow>
          </StyledTableBody>
        </VerticalTable>
      </VerticalTableContainer>
    </>
  )
}

export default DashboardTable