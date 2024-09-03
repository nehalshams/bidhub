import React, { ReactElement } from 'react'
import Modal from '../../../components/Modal'

type Props = {
    open: boolean;
    handleClose: () => void;
    children: ReactElement
}
const AuctionForm = ({ open, handleClose, children} : Props) => {
  return (
    <Modal open={open} handleClose={handleClose}>
        { children }
    </Modal>
  )
}

export default AuctionForm