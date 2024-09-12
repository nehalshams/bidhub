import React from 'react'
import { StyledTableCell } from '../../components/BaseTable'
import { Box, Table, TableBody, TableHead, TableRow, Typography } from '@mui/material'
import { bidData } from '../../data'
import dayjs from 'dayjs'

type Props = {
  bidHistory: any
}
const HistoryTable = ({ bidHistory}: Props) => {
  console.log("🚀 ~ file: HistoryTable.tsx:10 ~ HistoryTable ~ bidHistory:", bidHistory)
  return (
    <Box sx={{ margin: 1 }}>
    <Typography variant="h6" gutterBottom component="div">
      Bid History
    </Typography>
    <Table size="small" aria-label="purchases">
      <TableHead>
        <TableRow>
          <StyledTableCell>Date</StyledTableCell>
          <StyledTableCell>Customer</StyledTableCell>
          <StyledTableCell align="right">Amount</StyledTableCell>
          <StyledTableCell align="right">
            Total price ($)
          </StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {bidHistory?.map((historyRow) => (
          <TableRow key={historyRow.date}>
            <StyledTableCell component="th" scope="row">
              {dayjs(historyRow.createdAt).format('MM/DD/YYYY')}
            </StyledTableCell>
            <StyledTableCell component="th" scope="row">
              {historyRow.userId.firstName} {historyRow.userId.lastName}
            </StyledTableCell>
            {/* <StyledTableCell>{historyRow.customerId}</StyledTableCell> */}
            <StyledTableCell align="right">
              {historyRow.amount}
            </StyledTableCell>
            <StyledTableCell align="right">
              {historyRow.total}
              {/* {Math.round(historyRow.amount * row.price * 100) / 100} */}
            </StyledTableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Box>
  )
}

export default HistoryTable