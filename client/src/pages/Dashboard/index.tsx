import { Box } from "@mui/material";
import Layout from "../Layout";
import Navbar from "../Layout/Navbar";
// import BaseTable, { Bid } from "../../components/BaseTable";
import { useState } from "react";
import BidModal from "../../components/BidModal";
import BaseTable, { Bid } from "../../components/BaseTable";

const Dashboard = () => {
    const [bidModal, setBidModal] = useState<boolean>();
    const [rowData, setRowData] = useState<Bid>();
    
    const handlePlaceBid = (data: Bid) => {
      // console.log("handlePlaceBid", id);
      setRowData(data);
      setBidModal(true);
    };

    const handleConfirm = () => {
        
    }
  return (
    <Layout>
      <>
        <Navbar />
        <Box sx={{
            marginTop: '4rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Box sx={{
                width: '50vw',
                padding: '4rem'
            }}>
                <BaseTable handlePlaceBid={handlePlaceBid}/>
            </Box>
        </Box>
      {bidModal && (
        <BidModal
          data={rowData }
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
