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

type Props = {
  data?: Bid;
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
};

const BidModal = ({ data, open, handleClose }: Props) => {
  return (
    <Modal open={open} handleClose={handleClose}>
      <DialogTitle id="alert-dialog-title">{data?.name}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Box
            component="section"
            sx={{
              width: "25rem",
              p: 2,
              display: "flex",
              alignItems: 'center',
              gap: "3rem",
            }}
          >
            <Typography>Current Bid:</Typography>
            <Typography
              sx={{
                flex: 1,
              }}
            >
              ${data?.price}
              <Chip
                sx={{
                  marginLeft: "3rem",
                }}
                label={`by ${data?.history[0].bidderName}`}
              />
            </Typography>
          </Box>

          <Box
            component="section"
            sx={{
              width: "25rem",
              p: 2,
              display: "flex",
              alignItems: 'center',
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
            />
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button variant="contained" onClick={handleClose} autoFocus>
          Place Bid
        </Button>
      </DialogActions>
    </Modal>
  );
};

export default BidModal;
