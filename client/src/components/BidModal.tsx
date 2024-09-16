import * as React from "react";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import Modal from "./Modal";
import { TextField, Typography, Chip } from "@mui/material";
import { Box } from "@mui/system";
import { Bid } from "../types/bid.type";
import { usePlaceBidMutation } from "../api";
import { getUser } from "../utils/helper";
import { toast } from "react-toastify";

type Props = {
  data?: Bid;
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
};

const BidModal = ({ data, open, handleClose }: Props) => {
  const [bidPrice, setBidPrice] = React.useState(0);

  const [createBid, { error }] = usePlaceBidMutation();

  const handlePlaceBid = async () => {
    const { _id } = getUser();
    const payload = { auctionId: data?._id, userId: _id, amount: bidPrice };
    const resp = await createBid(payload);
    if ("data" in resp) {
      toast.success("Bid placed successfully");
      handleClose();
    }
    if (error) {
      const err = error as any;
      toast.error(err?.data?.message || "Bid is not placed.");
    }
  };

  return (
    <Modal open={open} handleClose={handleClose}>
      <DialogTitle id="alert-dialog-title">{data?.domainName}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Box
            component="section"
            sx={{
              width: "25rem",
              p: 2,
              display: "flex",
              alignItems: "center",
              gap: "3rem",
            }}
          >
            <Typography>Current Bid:</Typography>
            <Typography
              sx={{
                flex: 1,
              }}
            >
              ${data?.currentPrice || data?.startingPrice}
              <Chip
                sx={{
                  marginLeft: "3rem",
                }}
                label={`by ${data?.bidHistory?.[0]?.bidderName || "unknown"}`}
              />
            </Typography>
          </Box>

          <Box
            component="section"
            sx={{
              width: "25rem",
              p: 2,
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <Typography>Enter Amount:</Typography>
            <TextField
              sx={{
                padding: "0 .5rem",
              }}
              InputLabelProps={{ shrink: true }}
              label="$"
              onChange={(e) => setBidPrice(Number(e.target.value))}
            />
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button variant="contained" onClick={handlePlaceBid} autoFocus>
          Place Bid
        </Button>
      </DialogActions>
    </Modal>
  );
};

export default BidModal;
