import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import AuctionForm from "./AuctionForm";
import { Button, TextField, Typography } from "@mui/material";
import DateComponent from "../../../components/DatePicker";
import { useCreateAuctionMutation } from "../../../api";
import { toast } from "react-toastify";

type AuctionForm = {
  domainName?: string;
  description?: string;
  currentPrice?: number;
  auctionEndTime?: Date;
  createdAt?: Date;
};
export default function CreateAuction() {

  const [auctionModel, setAuctionModel] = React.useState(false);
  const [auctionForm, setAuctionForm] = React.useState<AuctionForm>();

  const [ createAuction] = useCreateAuctionMutation()
  const handleCreateAuctionBtn = () => {
    setAuctionModel(true);
  };

  const handleAuctionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAuctionForm({ ...auctionForm, [name]: value });
  };
  const handleDateChange = ({ name, value }: { name: string; value: any }) => {
    setAuctionForm({ ...auctionForm, [name]: value });
  };

  const handleCreateAuction = async () => {
    const resp = await createAuction(auctionForm)
    if(resp && resp?.data?.success){
      toast.success('Auction created successfully.');
      setAuctionModel(false)
    }else {
      toast.error('Auction not created');

    }
    
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
              onChange={handleAuctionChange}
              name="domainName"
              required
              fullWidth
              label="Enter domain"
              sx={{
                mb: "1rem",
              }}
            />
            <TextField
              onChange={handleAuctionChange}
              name="startingPrice"
              required
              fullWidth
              label="Base Price( $ )"
            />
            <Box
              mt={".5rem"}
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography>End Date</Typography>
              <DateComponent
                handleDateChange={(value: any) =>
                  handleDateChange({
                    name: "auctionEndTime",
                    value,
                  })
                }
              />
            </Box>
            <Box display={"flex"}>
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
                onClick={handleCreateAuction}
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
