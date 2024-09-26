import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Bid, CardDataType } from "../types/bid.type";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

export default function AuctionCardComponent({ domainName, auctionEndTime, startingPrice, currentPrice }: Partial<Bid>) {

  const navigate = useNavigate()
  return (
    <Box sx={{ minWidth: 200 }}>
      <Card sx={{ backgroundColor: "primary.light"  }} variant="outlined">
        <React.Fragment>
          <CardContent>
            <Typography variant="h5" component="div">
              {domainName}
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
              Auction end date: {dayjs(auctionEndTime).format('MM/DD/YYYY')}
            </Typography>
            <Typography variant="body2">
              Current Price: $ {currentPrice}
            </Typography>
            <Typography variant="body2">
              Starting price: $ {startingPrice}
              <br />
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => navigate('/')}>Go to auction page</Button>
          </CardActions>
        </React.Fragment>
      </Card>
    </Box>
  );
}
