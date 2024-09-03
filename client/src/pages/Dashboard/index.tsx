import { Box, TextField } from "@mui/material";
import Layout from "../Layout";
import Navbar from "../Layout/Navbar";
// import BaseTable, { Bid } from "../../components/BaseTable";
import { useState } from "react";
import BidModal from "../../components/BidModal";
import BaseTable from "../../components/BaseTable";
import { Bid } from "../../types/bid.type";
import Dropdown from "../../components/Dropdown";
import { domainType } from "../../data";
import CreateAuction from "./CreateAuction";

const Dashboard = () => {
  const [bidModal, setBidModal] = useState<boolean>();
  const [rowData, setRowData] = useState<Bid>();

  const handlePlaceBid = (data: Bid) => {
    // console.log("handlePlaceBid", id);
    setRowData(data);
    setBidModal(true);
  };

  const handleConfirm = () => {};
  const handleSearch = () => {};
  return (
    <Layout>
      <>
        <Navbar />
        <Box
          sx={{
            marginTop: "4rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box>
            <Box display={'flex'} gap={'.5rem'} mt={'3rem'} mb={'1rem'}>
              <TextField
                onChange={handleSearch}
                required
                fullWidth
                id="password"
                autoComplete="new-password"
                label="Auction Search"
              />
              <Dropdown options={domainType} label="Domain Type" />
            </Box>
            <BaseTable handlePlaceBid={handlePlaceBid} />
          </Box>
        </Box>
        <CreateAuction/>
        {bidModal && (
          <BidModal
            data={rowData}
            open={bidModal}
            handleClose={() => setBidModal(false)}
            handleConfirm={handleConfirm}
          />
        )}
      </>
    </Layout>
  );
};

export default Dashboard;
