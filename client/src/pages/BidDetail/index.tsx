import { Box, Button, CircularProgress, Grid2, Typography } from "@mui/material";
import React from "react";
import BidCard from "./BidCard";
import HistoryTable from "./HistoryTable";
import { useNavigate, useParams } from "react-router-dom";
import { useGetAuctionDetailQuery } from "../../api";
import DomainCardComponent from "./DomainCard";
import LanguageIcon from '@mui/icons-material/Language';
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
  const { id: auctionId } = useParams();
  const { data: auctionData, isLoading } = useGetAuctionDetailQuery({
    auctionId,
  });
  const navigate = useNavigate();
  const handleBackBtn = () => {
    navigate("/");
  };

  return (
    <Grid2
      container
      justifyContent={"center"}
      alignItems={"center"}
      spacing={"1rem"}
      padding={"1rem"}
      flexDirection={'column'}
    >
      {isLoading ? (
        <Box display={'flex'} justifyContent={'center'} flex={1}><CircularProgress/></Box>
      ) : (
        <>
          <Box width={'100%'} display={'flex'} justifyContent={'center'}>
            <Typography variant="h3" color="primary"><LanguageIcon fontSize="large"/> {auctionData?.data.domainName}</Typography>
          </Box>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Typography>Auction Details</Typography>
            <BidCard data={auctionData?.data} />
          </Grid2>
          {/* <Grid2 size={{ xs: 12, md: 4 }}>
            <Typography>Domain Details</Typography>
            <DomainCardComponent data={auctionData?.data || {}}/>
          </Grid2> */}

          <Grid2 size={{ xs: 12, md: 6 }}>
            <HistoryTable bidHistory={auctionData?.data.bidHistory || []} />
          </Grid2>
        </>
      )}

      <Grid2 size={{ xs: 12 }} display={'flex'} justifyContent={'center'}>
        <Button onClick={handleBackBtn} variant="contained">
          Back
        </Button>
      </Grid2>
    </Grid2>
  );
};

export default BidDetail;
