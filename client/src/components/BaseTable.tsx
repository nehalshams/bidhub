import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { bidData } from "../data";

// function createData(
//   name: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number,
//   price: number,
// ) {
//   return {
//     name,
//     calories,
//     fat,
//     carbs,
//     protein,
//     price,
//     history: [
//       {
//         date: "2020-01-05",
//         customerId: "11091700",
//         amount: 3,
//       },
//       {
//         date: "2020-01-02",
//         customerId: "Anonymous",
//         amount: 1,
//       },
//     ],
//   };
// }
export type Bid = {
  name: string;
  price: number;
  bid: number;
  history: {
    date: string;
    bidderName: string;
    price: number;
    total: number,
  }[];
};
type Props = { row: Bid; handleBidClick: (bid: Bid) => void };
function Row(props: Props) {
  const { row, handleBidClick } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset", backgroud: "primary.main" } }}
      >
        <StyledTableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          {row.name}
        </StyledTableCell>
        <StyledTableCell align="right">{row.price}</StyledTableCell>
        <StyledTableCell align="right">{row.bid}</StyledTableCell>
        <StyledTableCell align="right"></StyledTableCell>
        {/* <StyledTableCell align="right">{row.carbs}</StyledTableCell>
        <StyledTableCell align="right">{row.protein}</StyledTableCell> */}
        <StyledTableCell align="right">
          <Button onClick={() => handleBidClick(row)} variant="contained">
            Bid Now
          </Button>
        </StyledTableCell>
      </TableRow>
      <TableRow>
        <StyledTableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
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
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <StyledTableCell component="th" scope="row">
                        {historyRow.date}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {historyRow.bidderName}
                      </StyledTableCell>
                      {/* <StyledTableCell>{historyRow.customerId}</StyledTableCell> */}
                      <StyledTableCell align="right">
                        {historyRow.price}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        { historyRow.total}
                        {/* {Math.round(historyRow.amount * row.price * 100) / 100} */}
                      </StyledTableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </StyledTableCell>
      </TableRow>
    </React.Fragment>
  );
}


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

type TableProps = {
  handlePlaceBid: (id: Bid) => void;
};
export default function BaseTable({ handlePlaceBid }: TableProps) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <StyledTableCell />
            <StyledTableCell>Domain</StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
            <StyledTableCell align="right">Total Bid</StyledTableCell>
            <StyledTableCell align="right">Time Left</StyledTableCell>
            <StyledTableCell align="right" />
          </TableRow>
        </TableHead>
        <TableBody>
          {bidData.map((row) => (
            <Row key={row.name} row={row} handleBidClick={handlePlaceBid} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
