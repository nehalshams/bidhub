import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import AuctionForm from "./AuctionForm";
import { Button, TextField, Typography } from "@mui/material";

export default function CreateAuction() {
  const [auctionModel, setAuctionModel] = React.useState(false);
  const handleCreateAuctionBtn = () => {
    setAuctionModel(true);
  };
  return (
    <>
      <Box
        sx={{
          "& > :not(style)": { m: 1 },
          position: "fixed",
          right: "2rem",
          bottom: "2rem",
        }}
      >
        <Fab onClick={handleCreateAuctionBtn} variant="extended">
          <AddIcon sx={{ mr: 1 }} />
          Create Auction
        </Fab>
      </Box>
      {auctionModel && (
        <AuctionForm
          open={auctionModel}
          handleClose={() => setAuctionModel(false)}
        >
          <Box padding={{ xs: "1rem" }}>
            <Typography mb={"1rem"} variant="h5">
              Create Auction
            </Typography>
            <TextField
              // onChange={handleSearch}
              required
              fullWidth
              label="Enter domain"
              sx={{
                mb: "1rem",
              }}
            />
            <TextField
              // onChange={handleSearch}
              required
              fullWidth
              label="Base Price( $ )"
            />
            <Box display={'flex'}>
              <Button
                type="submit"
                fullWidth
                sx={{ mt: 3, mb: 2 }}
                onClick={() => setAuctionModel(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                // onClick={handleFormSubmit}
              >
                Create
              </Button>
            </Box>
          </Box>
        </AuctionForm>
      )}
    </>
  );
}
