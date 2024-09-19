import React from 'react'
import CreateAuction from '../Dashboard/CreateAuction'
import Layout from '../Layout'
import Navbar from '../Layout/Navbar'
import { Box, TextField } from '@mui/material'
import BaseTabs from '../../components/Tab'

const ProfilePage = () => {
  return (
    <Layout>
      <>
        <Navbar />
        <Box
          sx={{
            marginTop: "7rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
        </Box>
        <BaseTabs></BaseTabs>
        {/* <CreateAuction handleSignInModal={handleSignInModal} /> */}
        {/* {bidModal && (
          <BidModal
            data={rowData}
            open={bidModal}
            handleClose={() => setBidModal(false)}
            handleConfirm={handleConfirm}
          />
        )} */}
        {/* {signInModal && (
          <CustomModal
            open={signInModal}
            handleClose={handleSignInModal}
            primaryBtn="Go to Sign In"
            title="Need Sign In"
            handlePrimaryAction={handleSignInBtn}
          >
            {"Before taking any action need to do sign in first."}
          </CustomModal>
        )} */}
      </>
    </Layout>
  )
}

export default ProfilePage
