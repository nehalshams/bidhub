import React, { useMemo, useState } from "react";
import { StyledTableCell, StyledTableRow } from "../../components/BaseTable";
import {
  Box,
  Button,
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
  handleWinner?: (auctionId: string) => void;
};
const History = ({ open, auctionId, handleWinner }: Props) => {
  const { data: bidHistory, isLoading } = useGetAllBidQuery({
    auctionId,
  });

  return (
    <TableRow>
      {/* {isLoading ? (
        <CircularProgress/>
      ) : ( */}
      <StyledTableCell
        style={{ paddingBottom: 0, paddingTop: 0 }}
        colSpan={68}
      >
        {
          isLoading ?
            <CircularProgress />
            :
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  History
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#fff" }}>
                      <StyledTableCell>Date</StyledTableCell>
                      <StyledTableCell>Customer</StyledTableCell>
                      <StyledTableCell align="right">Amount</StyledTableCell>
                      <StyledTableCell align="right">
                        {
                          handleWinner &&
                          <>
                            Select Winner
                          </>
                        }
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
                        <StyledTableRow key={historyRow._id}>
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
                            {
                              handleWinner &&
                              <Button onClick={() => handleWinner(auctionId)} variant="contained">
                                Select as winner
                              </Button>
                            }
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
        }
      </StyledTableCell>
    </TableRow>
  );
};

export default History;
