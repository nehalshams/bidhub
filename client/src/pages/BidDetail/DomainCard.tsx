import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export default function DomainCardComponent({ data }: any) {
    const{ domainName } = data
  
  const navigate = useNavigate()
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <React.Fragment>
          <CardContent>
            <Typography variant="h5" component="div">
              {domainName}
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
              {/* Auction end date: {dayjs("").format('MM/DD/YYYY')} */}
            </Typography>
            <Typography variant="body2">
              {/* Starting price: {""}
              <br /> */}
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
