import { Box, Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'
import Modal from './Modal';

type Props = {
  open: boolean;
  handleClose: () => void;
  title?: string;
  handlePrimaryAction?: () => void;
  primaryBtn?: string
}
const CustomModal = ({ open, handleClose, title, handlePrimaryAction, primaryBtn }: Props) => {
  return (
    <Modal open={open} handleClose={handleClose}>
      <>
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button variant="contained" onClick={handlePrimaryAction} autoFocus>
            {primaryBtn}
          </Button>
        </DialogActions>
      </>
    </Modal>
  )
}

export default CustomModal