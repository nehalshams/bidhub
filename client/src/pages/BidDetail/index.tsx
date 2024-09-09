import { Button, Grid2, Typography } from "@mui/material";
import React from "react";
import BidCard from "./BidCard";
import HistoryTable from "./HistoryTable";
import { useNavigate } from "react-router-dom";
const bid = {
  name: "www.abc.com",
  price: 20,
  id: "7647576643743",
  bid: 2,
  history: [
    {
      bidderName: "Sam",
      date: "2020-01-05",
      price: 3,
      total: 23,
    },
    {
      bidderName: "Raj",
      date: "2020-01-02",
      total: 23,
      price: 1,
    },
  ],
};
const BidDetail = () => {
    const navigate = useNavigate()
    const handleBackBtn= () => {
        navigate('/')
    }
  return (
    <Grid2 container justifyContent={'center'} alignItems={'center'} spacing={'1rem'} padding={'1rem'}>
      <Grid2 size={{ xs: 12, md: 4 }}>
        <Typography>Auction Details</Typography>
        {/* <BidCard data={bid} /> */}
      </Grid2>
      <Grid2 size={{ xs: 12, md: 4 }} >
      <Typography>Domain Details</Typography>
        {/* <BidCard data={bid} /> */}
      </Grid2>

      <Grid2 size={{ xs: 12, md: 8}}>
        <HistoryTable/>
      </Grid2>

      <Grid2 size={{ xs: 12, md: 8}}>
        <Button onClick={handleBackBtn} variant="contained">
            Back
        </Button>
      </Grid2>
    </Grid2>
  );
};

export default BidDetail;
