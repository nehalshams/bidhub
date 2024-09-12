import React from "react";
import { StyledTableCell } from "../../components/BaseTable";
import {
  Box,
  CircularProgress,
  Collapse,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useGetAllBidQuery } from "../../api";
import dayjs from "dayjs";
import { HistoryType } from "../../types/bid.type";

type Props = {
  open: boolean;
  auctionId: string;
};
const History = ({ open, auctionId }: Props) => {
  const { data: bidHistory, isLoading } = useGetAllBidQuery({
    auctionId,
  });
  console.log("🚀 ~ file: History.tsx:16 ~ History ~ bidHistory:", bidHistory);
  return (
    <TableRow>
      {isLoading ? (
        <CircularProgress/>
      ) : (
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
                  {bidHistory?.data.map((historyRow: HistoryType) => {
                    const {
                      createdAt,
                      amount,
                      user: { firstName, lastName },
                    } = historyRow;
                    const formattedDate = dayjs(createdAt).format("MM/DD/YYYY");
                    return (
                      <TableRow key={historyRow._id}>
                        <StyledTableCell component="th" scope="row">
                          {formattedDate}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {firstName || ""} {lastName || ""}
                        </StyledTableCell>
                        {/* <StyledTableCell>{historyRow.customerId}</StyledTableCell> */}
                        <StyledTableCell align="right">
                          {amount}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {/* {historyRow.total} */}
                          {/* {Math.round(historyRow.amount * row.price * 100) / 100} */}
                        </StyledTableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </StyledTableCell>
      )}
    </TableRow>
  );
};

export default History;
